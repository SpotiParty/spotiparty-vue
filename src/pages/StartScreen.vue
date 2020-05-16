<template>
   <div class="start-screen fullscreen">
      <BaseIcon width="256" height="256">
         <Logo />
      </BaseIcon>
      <div class="buttons">
         <BaseButton>Crea party</BaseButton>
         <BaseButton>Partecipa</BaseButton>
      </div>
   </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.start-screen
   box-sizing: border-box
   background-color: map-get($colors, 'background')
   display: flex
   flex-direction: column
   justify-content: space-between
   align-items: center
   padding: 20%
   .buttons
      height: 146px
      display: flex
      flex-direction: column
      justify-content: space-between
</style>
