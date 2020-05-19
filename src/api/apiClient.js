import axios from 'axios'

const apiClient = axios.create({
   baseURL: 'https://api.spotify.com/v1',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   },
   timeout: 500
})

export default apiClient
