<template>
   <div class="settings">
      <p>playlist corrente :</p>
      <p class="playlist-name">Nome Playlist</p>
      <BaseButton :width="220">Cambia playlist</BaseButton>
      <!-- TODO controllare per le lettere accentate -->
      <p>modalità party</p>
      <BaseSwitch :width="300" :options="this.party_modes" />
   </div>
</template>

<script>
export default {
   data() {
      return {
         party_modes: ['battaglia', 'democrazia']
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.settings
   padding: 0 30px 0 30px
   display: flex
   flex-direction: column
   justify-content: flex-start
   align-items: flex-start
   height: calc(100vh - 72px)
   background-color: map-get($colors, 'background')
   > p
      margin: 30px 0 10px 0
      font-size: 18px
      color: white
   > .playlist-name
      margin: 0px 0 20px 0
      font-size: 24px
</style>
