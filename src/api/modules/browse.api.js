import apiClient from '@/api/apiClient.js'

export default {
   getListOfCategory() {
      return apiClient.get('/browse/categories')
   },
   getListOfCategoryPlaylists(category_id) {
      return apiClient.get(`/browse/categories/${category_id}/playlists`)
   }
}
