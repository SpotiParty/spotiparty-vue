import PlaylistApi from '@/api/modules/playlist.api.js'

export default {
   namespaced: true,
   state: {
      user_playlists: []
   },
   mutations: {
      ADD_PLAYLISTS(state, new_playlists) {
         state.user_playlists = [...new_playlists]
      },
      ADD_PLAYLIST(state, new_playlist) {
         state.user_playlists.push(new_playlist)
      },
      ADD_TRACKS_TO_PLAYLIST(state, params) {
         const playlist = state.user_playlists.find(playlist => playlist.id == params.playlist_id)
         if (playlist) {
            playlist.tracks = []
            playlist.tracks = [...params.tracks]
         }
      }
   },
   actions: {
      async getListOfPlaylists({ commit, rootState }) {
         const payload = rootState.user.user.id
         await PlaylistApi.getUserPlaylists(payload)
            .then(response => {
               const playlists = []
               response.data.items.forEach(playlist => {
                  const parsedPlaylist = {
                     id: playlist.id,
                     uri: playlist.uri,
                     name: playlist.name,
                     description: playlist.description,
                     images: playlist.images,
                     tracks: playlist.tracks
                  }
                  playlists.push(parsedPlaylist)
               })
               return playlists
            })
            .then(playlists => {
               playlists.forEach(async playlist => {
                  const payload = playlist.id
                  await PlaylistApi.getPlaylistCover(payload)
                     .then(response => {
                        playlist.images = response.data
                     })
                     .catch(error => console.log(error))
               })
               commit('ADD_PLAYLISTS', playlists)
            })
            .catch(error => console.log(error))
      },
      async getPlaylistTracksAndAddToPlayQueue({ commit, dispatch, getters }, playlist_id) {
         await PlaylistApi.getPlaylistTracks(playlist_id)
            .then(response => {
               const tracks = []
               //Remove unnecessary data from tracks
               response.data.items.forEach(track => {
                  //Remove unnecessary data from artists
                  const artists = []
                  track.track.artists.forEach(artist => {
                     const parsedArtist = {
                        id: artist.id,
                        name: artist.name,
                        uri: artist.uri
                     }
                     artists.push(parsedArtist)
                  })
                  const parsedTrack = {
                     id: track.track.id,
                     images: track.track.images,
                     name: track.track.name,
                     artists: artists,
                     uri: track.track.uri,
                     playlist_uri: getters.playlist_uri(playlist_id),
                     playlist_id: playlist_id
                  }
                  tracks.push(parsedTrack)
               })
               return tracks
            })
            .then(tracks => {
               const params = {
                  playlist_id: playlist_id,
                  tracks: tracks
               }
               commit('ADD_TRACKS_TO_PLAYLIST', params)
               dispatch('party/addTracksToQueue', tracks, { root: true })
            })
            .catch(error => console.log(error))
      }
   },
   getters: {
      playlist_uri: state => playlist_id => {
         const correctPlaylist = state.user_playlists.find(playlist => playlist.id == playlist_id)
         return correctPlaylist.uri
      }
   }
}
