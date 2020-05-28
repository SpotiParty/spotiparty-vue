<template>
   <div class="select-playlist">
      <div class="header">
         <p class="title">Scegli una playlist</p>
         <TabSelector :tabs="tab_options" @tab-selected="changeTab" />
      </div>
      <div class="playlist-list">
         <transition name="list-left" mode="out-in">
            <div v-if="selected_tab == 0" class="my-playlists">
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
         </transition>
         <transition name="list-right" mode="out-in">
            <div v-if="selected_tab == 1" class="browse">
               <div v-for="(number, index) in numbers" :key="index">
                  <Category />
               </div>
            </div>
         </transition>
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Playlist from '@/components/Playlist.vue'
import TabSelector from '@/components/TabSelector.vue'
import Category from '@/components/Category.vue'

export default {
   components: {
      Playlist,
      TabSelector,
      Category
   },
   data() {
      return {
         tab_options: ['Le mie playlist', 'Esplora'],
         selected_tab: 0,
         selected_playlist: null,
         numbers: [1, 2, 3, 4, 5, 6, 7, 8]
      }
   },
   computed: {
      ...mapState('playlist', ['user_playlists'])
   },
   methods: {
      ...mapActions('playlist', ['getListOfPlaylists']),
      changeTab(index) {
         this.selected_tab = index
      },
      selectPlaylist(playlist_id) {
         this.selected_playlist = playlist_id
      }
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
      padding: 0px 20px 30px 20px
      >.browse
         display: flex
         flex-wrap: wrap

.selected-playlist
   filter: brightness(160%)
</style>
