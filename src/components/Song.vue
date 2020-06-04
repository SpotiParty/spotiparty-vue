<template>
   <div :style="style" class="song-element" @click="click">
      <div class="img">
         <img class="track-image" :src="track.icons[0].url" />
      </div>
      <div class="song-name">
         <div class="style-text-song">{{ track.name }}</div>
         <div class="style-text-album">{{ track.album }}</div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      track: {
         type: Object,
         default: null
      },
      height: {
         type: Number,
         default: 62
      },
      width: {
         type: Number,
         default: 100
      }
   },
   data() {
      return {
         style: {
            height: this.height + 'px',
            width: this.width + '%'
         }
      }
   },
   methods: {
      click() {
         this.$emit('click')
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.song-element
   background-color: map-get($colors, 'background')
   display: grid
   grid-template-columns: 5% 20% 3% 67% 5%
   grid-template-rows: 100%
   margin: 7px 0
.img
   grid-column-end: 3
   grid-column-start: 2
   grid-row: auto
.song-name
   align-self: center
   grid-column-end: 5
   grid-column-start: 4
   grid-row: auto
   justify-self: flex-start
.style-text-song
   color: white
   font-size: 20px
   text-align: start
.style-text-album
   color: white
   font-size: 15px
   text-align: start
.track-image
   height: 62px
   width: 62px
</style>
