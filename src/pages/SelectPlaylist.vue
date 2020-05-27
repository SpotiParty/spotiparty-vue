<template>
   <div class="select-playlist fullscreen">
      <p class="title">Scegli una playlist</p>
      <div class="TabBars">
         <p>prova</p>
      </div>
      <Playlist />
   </div>
</template>

<script>
import Playlist from '@/components/Playlist.vue'
export default {
   components: {
      Playlist
   }
}
</script>

<style lang="sass" scoped>
.select-playlist
   background-color: #323232
   box-sizing: border-box
   display: flex
   flex-direction: column
   justify-content: space-between
   padding: 30px
.title
   display: flex
   justify-content: flex-start
   font-size: 32px
   font-weight: 600
   color: white
   margin: 0px
</style>
