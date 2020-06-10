<template>
   <div class="vote-element" @click="click">
      <img class="img" :src="track.images[0].url" />
      <div class="voti">
         <p>voti</p>
         <p class="style-text-voti">1</p>
      </div>
      <div class="style-name-song">{{ track.name }} - {{ track.artists[0].name }}</div>
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
      click() {}
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.vote-element
   background-color: rgba(0,0,0,0.2)
   border-radius: 25px
   box-sizing: border-box
   display: grid;
   grid-template-columns: 60% 40%
   grid-template-rows: 75% 25%
   height: 100%
   margin-top: 50px
   width: 100%
.img
   align-self: flex-start
   background-color: white
   grid-column: 1
   grid-row: 1
   justify-self: flex-start
   margin-left: 30px
   margin-top: 30px
   max-height: 100%
   max-width: 100%
   min-height: 170px
   min-width: 170px
.voti
   align-items: center
   color: #ffffff
   display: flex
   flex-direction: column
   font-size: 24px
   grid-column: 2
   grid-row: 1
   justify-content: center
   margin: 0;
   padding-top: 10px
.voti > p
   margin-bottom: 5px
.style-name-song
   align-self: center
   color: #ffffff
   font-size: 18px
   grid-column-end: 3
   grid-column-start: 1
   grid-row: 2
   justify-self: flex-start
   margin-bottom: 10px
   padding-left: 20px
   padding-right: 20px
   text-align: start
.style-text-voti
   color: #00BA61
   margin-top: 0
</style>
