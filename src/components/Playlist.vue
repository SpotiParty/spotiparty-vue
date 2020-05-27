<template>
   <div class="playlist">
      <img
         v-if="has_cover"
         class="playlist-image"
         :src="playlist.images[0].url"
      />
      <img v-else class="playlist-image" :src="generic_cover" />
      <p class="playlist-title">{{ playlist.name }}</p>
   </div>
</template>

<script>
import generic_cover from '@/assets/images/no-cover.png'
export default {
   props: {
      playlist: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         has_cover: !!this.playlist.images[0],
         generic_cover: generic_cover
      }
   }
}
</script>

<style lang="sass" scoped>
.playlist
   display: flex
   align-items: center
   margin: 12px
.playlist-image
    width: 80pxs
    height: 80px
    margin-top: 0px
.playlist-title
   padding: 20px
   font-size: 24px
   font-weight: 400
   color: white
   margin: 0px
</style>
