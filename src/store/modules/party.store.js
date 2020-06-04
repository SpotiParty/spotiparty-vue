import { firestoreAction, vuexfireMutations } from 'vuexfire'
import { db } from '@/db.js'
import router from '@/router/router.js'
import PlaylistApi from '@/api/modules/playlist.api.js'
import Utils from '@/utils.js'

export default {
   namespaced: true,
   state: {
      party_code: null,
      party_playlist: {
         tracks: [],
         name: '',
         id: null,
         uri: null
      },
      //Track that is currently playing
      currently_playing: null,
      in_play: false,
      firebase_votes: null,
      voted_song_id: null
   },
   mutations: {
      ...vuexfireMutations,
      ADD_PARTY_CODE(state, party_code) {
         state.party_code = party_code
      },
      /*
         Replace the current tracks with the new tracks
      */
      ADD_TRACKS_TO_QUEUE(state, tracks) {
         state.party_playlist.tracks = [...tracks]
      },
      PLAY_PAUSE(state, status) {
         state.in_play = status
      },
      ADD_PLAYLIST_NAME(state, name) {
         state.party_playlist.name = name
      },
      ADD_PLAYLIST_IDS(state, params) {
         state.party_playlist.id = params.id
         state.party_playlist.uri = params.uri
      },
      UPDATE_SONG_VOTES(state, song_votes) {
         const track = state.party_playlist.tracks.find(track => track.id == song_votes.track_id)
         track.votes = song_votes.votes
      },
      VOTE_A_SONG(state, track_id) {
         state.voted_song_id = track_id
      }
   },
   actions: {
      bindFirebaseVotes: firestoreAction(async ({ bindFirestoreRef, state }) => {
         // return the promise returned by `bindFirestoreRef`
         return bindFirestoreRef('firebase_votes', db.collection('votes').doc(state.party_code))
      }),
      /*
         Add the party code to the store, create a playlist name with the party code
         and create the playlist on the Spotify account of the host. Then get the ids
         for the playlist and save them in the store
      */
      async createParty({ commit, dispatch, rootState }, party_code) {
         commit('ADD_PARTY_CODE', party_code)
         const playlist_name = `party_${party_code}`
         commit('ADD_PLAYLIST_NAME', playlist_name)
         await PlaylistApi.createPlaylist(playlist_name, rootState.user.user.id).then(response => {
            const params = {
               id: response.data.id,
               uri: response.data.uri
            }
            commit('ADD_PLAYLIST_IDS', params)
         })
         await dispatch('uploadPartyCode')
      },
      uploadPartyCode: firestoreAction(({ state, rootState }) => {
         db.collection('votes')
            .doc(state.party_code)
            .set({
               voters: 0
            })
         db.collection('party').add({
            party_code: state.party_code,
            spotify_token: rootState.user.access_token,
            votes: db.collection('votes').doc(state.party_code)
         })
      }),
      /*
         Check if in Firebase there is an entry with a party_code that 
         correspond with the insterted code
      */
      async joinParty({ commit }, input_code) {
         const outputDocument = await db
            .collection('party')
            .where('party_code', '==', `${input_code}`)
            .get()
         if (outputDocument.docs.length != 0) {
            router.push({ name: 'GuestPartyHome' })
            commit('ADD_PARTY_CODE', input_code)
         }
      },
      /*
         Shuffle the playlist and add it to Spotify, Firebase and the store
      */
      async addTracksToPlaylist({ commit, dispatch, state }, tracks) {
         tracks = Utils.shuffle(tracks)
         commit('ADD_TRACKS_TO_QUEUE', tracks)
         await PlaylistApi.addTracksToPlaylist(tracks, state.party_playlist.id)
         await dispatch('uploadPlaylist')
         await dispatch('bindFirebaseVotes')
      },
      /*
         Upload to firebase an object called votes with property named as tracks
         ids and votes for the object
      */
      uploadPlaylist: firestoreAction(async ({ state, getters }) => {
         const track_ids = getters.tracks_ids
         const songs_votes = []
         //Create an object with track ids as object properties
         track_ids.forEach(track_id => {
            const song_votes = {
               track_id: track_id,
               votes: 0
            }
            songs_votes.push(song_votes)
         })
         await db
            .collection('votes')
            .doc(state.party_code)
            .update({
               songs_votes: songs_votes
            })
      }),
      async playPause({ commit, dispatch, state }) {
         const status = !state.in_play
         await dispatch('syncPlayPause', status)
         commit('PLAY_PAUSE', status)
      },
      syncPlayPause: firestoreAction(status => {
         return db.collection('party').add({
            in_play: status
         })
      }),
      async updateStateVotes({ commit }, firebase_votes) {
         firebase_votes.songs_votes.forEach(song_votes => {
            commit('UPDATE_SONG_VOTES', song_votes)
         })
      },
      async updateVotes({ state, commit }, track_id) {
         const new_votes = JSON.parse(JSON.stringify(state.firebase_votes.songs_votes))
         const song_to_vote = new_votes.find(song => song.track_id == track_id)
         if (state.voted_song_id != null) {
            const old_vote = new_votes.find(song => song.track_id == state.voted_song_id)
            old_vote.votes -= 1
         }
         song_to_vote.votes += 1
         commit('VOTE_A_SONG', track_id)
         await db
            .collection('votes')
            .doc(state.party_code)
            .update({ songs_votes: new_votes })
      }
   },
   getters: {
      isPartyCode(state) {
         return state.party_code != null
      },
      logged_in: state => !!state.party_code,
      tracks_ids(state) {
         return state.party_playlist.tracks.map(track => track.id)
      }
   }
}
