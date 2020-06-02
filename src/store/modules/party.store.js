import { firestoreAction } from 'vuexfire'
import { db } from '@/db.js'
import router from '@/router/router.js'
import PlaylistApi from '@/api/modules/playlist.api.js'

function shuffle(array) {
   var j, x, i
   for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = array[i]
      array[i] = array[j]
      array[j] = x
   }
   return array
}

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
      currently_playing: null,
      in_play: false
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party_code = party_code
      },
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
      }
   },
   actions: {
      bindPartyId: firestoreAction(({ bindFirestoreRef }) => {
         return bindFirestoreRef('party', db.collection('party'))
      }),
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
         return db.collection('party').add({
            party_code: state.party_code,
            spotify_token: rootState.user.access_token
         })
      }),
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
      async addTracksToPlaylist({ commit, state }, tracks) {
         tracks = shuffle(tracks)
         commit('ADD_TRACKS_TO_QUEUE', tracks)
         await PlaylistApi.addTracksToPlaylist(tracks, state.party_playlist.id)
      },
      async playPause({ commit, dispatch, state }) {
         const status = !state.in_play
         await dispatch('syncPlayPause', status)
         commit('PLAY_PAUSE', status)
      },
      syncPlayPause: firestoreAction(status => {
         return db.collection('party').add({
            in_play: status
         })
      })
   },
   getters: {
      isPartyCode(state) {
         return state.party_code != null
      },
      logged_in: state => !!state.party_code
   }
}
