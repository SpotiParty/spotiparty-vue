import apiClient from '@/api/apiClient.js'

export default {
   getUserPlaylists() {
      return apiClient.get('/me/playlists')
   },
   getPlaylistTracks(playlist_id) {
      return apiClient.get('/playlists/' + playlist_id + '/tracks')
   }
}
