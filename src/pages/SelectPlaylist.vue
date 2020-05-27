<template>
   <div class="select-playlist">
      <p class="title">Scegli una playlist</p>
      <div class="empty"></div>
      <div class="playlist-list">
         <transition-group name="slide-fade-horizontal">
            <div v-for="playlist in user_playlists" :key="playlist.id">
               <Playlist :playlist="playlist" />
            </div>
         </transition-group>
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
      if (this.user_playlists.length == 0) {
         this.getListOfPlaylists()
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/animations.sass'
@import '@/assets/variables.scss'

$navigation-height: 69px
.empty
   height: $navigation-height
.select-playlist
   background-color: map-get($colors, "background")
   height: 100%
   margin: 0px
   padding: 0px
.title
   background-color: map-get($colors, "background")
   box-sizing: border-box
   color: white
   display: flex
   font-size: 32px
   font-weight: 600
   justify-content: flex-start
   margin: 0px
   padding: 30px 30px 0px 30px
   position: fixed
   width: 100%
   z-index: 2
.playlist-list
   background-color: map-get($colors, "background")
   padding: 0px 30px 30px 30px
</style>
