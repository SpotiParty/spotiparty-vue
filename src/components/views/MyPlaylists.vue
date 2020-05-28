<template>
   <div class="my-playlists">
      <div v-for="playlist in user_playlists" :key="playlist.id">
         <Playlist
            :playlist="playlist"
            @click="selectPlaylist(playlist.id)"
            :class="{
               'selected-playlist': selected_playlist == playlist.id
            }"
         />
      </div>
   </div>
</template>

<script>
import Playlist from '@/components/Playlist.vue'
import { mapState, mapActions } from 'vuex'

export default {
   components: {
      Playlist
   },
   computed: {
      ...mapState('playlist', ['user_playlists'])
   },
   methods: {
      ...mapActions('playlist', ['getListOfPlaylists'])
   },
   created() {
      if (this.user_playlists.length == 0) {
         this.getListOfPlaylists()
      }
   }
}
</script>

<style lang="sass" scoped>
.selected-playlist
   filter: brightness(160%)
</style>
