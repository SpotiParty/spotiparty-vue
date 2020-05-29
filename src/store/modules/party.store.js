import { firestoreAction } from 'vuexfire'
import { db } from '@/db.js'
import router from '@/router/router.js'

export default {
   namespaced: true,
   state: {
      party: {
         party_code: null
      }
   },
   mutations: {
      ADD_PARTY_CODE(state, party_code) {
         state.party.party_code = party_code
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
            party_code: state.party.party_code,
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
      }
   },
   getters: {}
}
