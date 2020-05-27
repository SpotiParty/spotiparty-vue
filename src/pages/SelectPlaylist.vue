<template>
   <div class="select-playlist fullscreen">
      <p class="title">Scegli una playlist</p>
      <div
         class="playlist-list"
         v-for="(playlist, index) in user_playlists"
         :key="index"
      >
         <Playlist :playlist="playlist" />
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Playlist from '@/components/Playlist.vue'
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
      this.getListOfPlaylists()
   }
}
</script>

<style lang="sass" scoped>
.select-playlist
   background-color: #323232
   box-sizing: border-box
   display: flex
   flex-direction: column
   padding: 30px
.title
   display: flex
   justify-content: flex-start
   font-size: 32px
   font-weight: 600
   color: white
   margin: 0px
</style>
