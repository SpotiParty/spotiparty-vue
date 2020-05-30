import { firestoreAction } from 'vuexfire'
import { db } from '@/db.js'

export default {
   namespaced: true,
   state: {
      party_code: null,
      current_playlist: [],
      currently_playing: null,
      in_play: false
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party_code = party_code
      },
      ADD_TRACKS_TO_QUEUE(state, tracks) {
         state.current_playlist = [...tracks]
      },
      PLAY_PAUSE(state, status) {
         state.in_play = status
      }
   },
   actions: {
      bindPartyId: firestoreAction(({ bindFirestoreRef }) => {
         return bindFirestoreRef('party', db.collection('party'))
      }),
      async createParty({ commit, dispatch }, party_code) {
         commit('ADD_PARTY_CODE', party_code)
         await dispatch('uploadPartyCode')
      },
      uploadPartyCode: firestoreAction(({ state, rootState }) => {
         return db.collection('party').add({
            party_code: state.party_code,
            spotify_token: rootState.user.access_token
         })
      }),
      addTracksToQueue({ commit }, tracks) {
         commit('ADD_TRACKS_TO_QUEUE', tracks)
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
      logged_in: state => !!state.party_code
   }
}
