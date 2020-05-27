<template>
   <div class="playlist">
      <div class="playlist-content">
         <img
            v-if="has_cover"
            class="playlist-image"
            :src="playlist.images[0].url"
         />
         <img v-else class="playlist-image" :src="generic_cover" />
         <p class="playlist-title">{{ playlist.name }}</p>
      </div>
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
@import '@/assets/variables.scss'
.playlist
   background-color: map-get($colors, "background")
   padding: 12px
.playlist-content
   align-items: center
   display: flex
.playlist-image
   height: 80px
   margin-top: 0px
   width: 80px
.playlist-title
   padding: 20px
   font-size: 24px
   font-weight: 400
   color: white
   margin: 0px
</style>
