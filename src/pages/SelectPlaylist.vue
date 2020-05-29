<template>
   <div class="select-playlist">
      <div class="header">
         <p class="title">Scegli una playlist</p>
         <TabSelector :tabs="tab_options" @tab-selected="changeTab" />
      </div>
      <div class="playlist-list">
         <transition :name="animation" mode="out-in">
            <router-view @select="selectPlaylist"></router-view>
         </transition>
      </div>
      <div class="tab-bar">
         <BaseButton :button_class="button_type" @click="choosePlaylist">
            Cominciamo!
         </BaseButton>
      </div>
   </div>
</template>

<script>
import TabSelector from '@/components/TabSelector.vue'
import { mapActions } from 'vuex'

export default {
   components: {
      TabSelector
   },
   data() {
      return {
         tab_options: ['Le mie playlist', 'Esplora'],
         selected_tab: 0,
         selected_playlist_id: null,
         animation: 'slide-fade-horizontal-right'
      }
   },
   computed: {
      button_type() {
         if (this.selected_playlist_id == null) {
            return 'disabled'
         }
         return 'primary'
      }
   },
   methods: {
      ...mapActions('playlist', ['getPlaylistTracksAndAddToPlayQueue']),
      changeTab(index) {
         index == 0
            ? this.$router.push({ name: 'MyPlaylists' })
            : this.$router.push({ name: 'BrowseCategories' })
         index == 0
            ? (this.animation = 'slide-fade-horizontal-right')
            : (this.animation = 'slide-fade-horizontal-left')
      },
      selectPlaylist(playlist_id) {
         this.selected_playlist_id = playlist_id
      },
      choosePlaylist() {
         if (this.selected_playlist_id != null) {
            this.getPlaylistTracksAndAddToPlayQueue(this.selected_playlist_id)
            this.$router.push({ name: 'HostPartyHome' })
         }
      }
   },
   created() {
      this.$router.push({ name: 'MyPlaylists' })
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
   .tab-bar
      height: 72px
      width: 100%
      position: fixed
      display: flex
      align-items: center
      justify-content: center
      bottom: 0px
      background-color: map-get($colors, "background")
      box-shadow: 0px -5px 15px 14px rgba(0,0,0,0.65);
</style>
