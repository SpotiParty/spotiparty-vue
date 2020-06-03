<template>
   <div :style="style" class="song-element" @click="click">
      <div class="img">
         <img class="track-image img" :src="track.icons[0].url" />
      </div>
      <div class="song-name">
         <h3>{{ track.name }}</h3>
         <h5>{{ track.album }}</h5>
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
         default: 64
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
   },
   created() {
      this.track = {
         name: 'Nome traccia',
         icons: [
            {
               url: 'https://i.scdn.co/image/ab67616d00001e0296d6790f8d107fbc0148a526'
            }
         ],
         album: 'Album'
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
   grid-column-start: 2
   grid-column-end: 3
   grid-row: auto
   place-self: center
.song-name
   grid-column-start: 4
   grid-column-end: 5
   grid-row: auto

   align-self: center
   justify-self: start
h3
   padding: 0
   margin: 0
   text-align: start
   color: white
h5
   padding: 0
   margin: 0
   text-align: start
   color: white
.track-image
   height: 62px
   width: 62px
</style>
