import { firestoreAction } from 'vuexfire'
import { db } from '@/db.js'
import router from '@/router/router.js'

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
      isPartyCode(state) {
         return state.party_code != null
      },
      logged_in: state => !!state.party_code
   }
}
