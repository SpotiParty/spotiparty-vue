import PlaylistApi from '@/api/modules/playlist.api.js'

export default {
   namespaced: true,
   state: {
      user_playlists: []
   },
   mutations: {
      ADD_PLAYLISTS(state, new_playlists) {
         state.user_playlists.concat(new_playlists)
      },
      ADD_PLAYLIST(state, new_playlist) {
         state.user_playlists.push(new_playlist)
      }
   },
   actions: {
      async getListOfPlaylists({ dispatch, rootState }) {
         const payload = rootState.user.user.id
         await PlaylistApi.getUserPlaylists(payload)
            .then(response => {
               response.items.forEach(playlist => {
                  dispatch('getPlaylistImage', playlist)
               })
            })
            .catch(error => console.log(error))
      },
      async getPlaylistImage({ commit }, playlist) {
         const payload = playlist.id
         await PlaylistApi.getPlaylistCover(payload)
            .then(response => {
               playlist.images = response
            })
            .catch(error => console.log(error))
         commit('ADD_PLAYLIST', playlist)
      }
   },
   getters: {}
}
