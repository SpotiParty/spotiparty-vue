<template>
   <div class="select-playlist">
      <div class="header">
         <p class="title">Scegli una playlist</p>
         <TabSelector :tabs="tab_options" @tab-selected="changeTab" />
      </div>
      <div class="playlist-list">
         <transition :name="animation" mode="out-in">
            <router-view></router-view>
         </transition>
      </div>
   </div>
</template>

<script>
import TabSelector from '@/components/TabSelector.vue'

export default {
   components: {
      TabSelector
   },
   data() {
      return {
         tab_options: ['Le mie playlist', 'Esplora'],
         selected_tab: 0,
         selected_playlist: null,
         animation: 'slide-fade-horizontal-right'
      }
   },
   methods: {
      changeTab(index) {
         index == 0
            ? this.$router.push({ name: 'MyPlaylists' })
            : this.$router.push({ name: 'BrowseCategories' })
         index == 0
            ? (this.animation = 'slide-fade-horizontal-right')
            : (this.animation = 'slide-fade-horizontal-left')
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
</style>
