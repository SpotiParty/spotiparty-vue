import BrowseApi from '@/api/modules/browse.api.js'

export default {
   namespaced: true,
   state: {
      categories: [],
      category_playlists: [],
      offset: 0,
      limit: 8
   },
   mutations: {
      ADD_CATEGORIES(state, categories) {
         state.offset += state.limit
         console.log(categories)
         state.categories = [...categories]
      },
      ADD_CATEGORY_PLAYLISTS(state, params) {
         state.category_playlists.push(params)
      }
   },
   actions: {
      async getCategories({ state, commit }) {
         //TODO api call when scroll
         await BrowseApi.getListOfCategory(state.offset, state.limit)
            .then(response => {
               console.log(response.data.categories.items)
               commit('ADD_CATEGORIES', response.data.categories.items)
            })
            .catch(error => console.log(error))
      },
      async getCategoryPlaylists({ commit }, category_id) {
         await BrowseApi.getListOfCategoryPlaylists(category_id)
            .then(response => {
               const params = {
                  category_id: category_id,
                  playlists: response.data.items
               }
               commit('ADD_CATEGORY_PLAYLISTS', params)
            })
            .catch(error => console.log(error))
      }
   },
   getters: {
      category_has_playlists: state => category_id => {
         return (
            state.category_playlists.find(
               item => item.category_id == category_id
            ) != undefined
         )
      },
      category_playlists: state => category_id => {
         return state.category_playlists.find(
            item => item.category_id == category_id
         ).playlists
      }
   }
}
