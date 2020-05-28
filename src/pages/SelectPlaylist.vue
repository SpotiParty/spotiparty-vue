<template>
   <div class="select-playlist">
      <div class="header">
         <p class="title">Scegli una playlist</p>
         <TabSelector />
      </div>
      <div class="playlist-list">
         <transition-group name="slide-fade-horizontal-left">
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
import TabSelector from '@/components/TabSelector.vue'

export default {
   components: {
      Playlist,
      TabSelector
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

$navigation-height: 141px

.select-playlist
   background-color: map-get($colors, "background")
   height: 100%
   margin: 0px
   padding: 0px
   position: relative
   .header
      background-color: map-get($colors, "background")
      padding: 30px 30px 0px 30px
      width: 100%
      z-index: 2
      position: fixed
      top: 0px
      box-sizing: border-box
      .title
         display: flex
         justify-content: flex-start
         box-sizing: border-box
         color: white
         font-size: 32px
         font-weight: 600
         margin: 0px
   .playlist-list
      position: absolute
      top: $navigation-height
      right: 0px
      left: 0px
      background-color: map-get($colors, "background")
      padding: 0px 30px 30px 30px
</style>
