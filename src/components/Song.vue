<template>
   <div class="song-element" @click="click">
      <div class="img">
         <img class="track-image" :src="track.images[0].url" />
      </div>
      <div class="song-name">
         <div class="style-text-song">{{ track.name }}</div>
         <div class="style-text-artist">{{ track.artists[0].name }}</div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      track: {
         type: null,
         required: true
      }
   },
   methods: {
      click() {
         this.$emit('click', this.track.id)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.song-element
   background-color: map-get($colors, 'background')
   display: grid
   width: 100%
   height: 82px
   grid-template-columns: 62px auto
   column-gap: 10px
   grid-template-rows: 100%
   padding: 10px 0px
   box-sizing: border-box
.img
   grid-row: auto
.song-name
   align-self: center
   grid-row: auto
   justify-self: flex-start
.style-text-song
   color: white
   font-size: 20px
   text-align: start
.style-text-artist
   color: white
   font-size: 15px
   text-align: start
.track-image
   height: 62px
   width: 62px
</style>
