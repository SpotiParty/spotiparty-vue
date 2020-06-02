<template>
   <div class="tab-bar">
      <router-link :to="{ name: 'player' }">
         <div class="player">
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Player />
            </BaseIcon>
            <div class="title">Player</div>
         </div>
      </router-link>

      <router-link :to="{ name: 'Ciao' }">
         <div class="vector">
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Vector />
            </BaseIcon>
            <div class="title">Votazione</div>
         </div>
      </router-link>

      <router-link :to="{ name: 'Nati <3' }">
         <div class="setting">
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Setting />
            </BaseIcon>
            <div class="title">Impostazione</div>
         </div>
      </router-link>
   </div>
</template>
<script>
export default {}
</script>

<style lang="sass" scoped>
.tab-bar
   color: white
   display: flex
   flex-direction: row
   justify-content: space-around
   align-items: center
   width: 100%
   height: 72px
   .player
      display: flex
      flex-direction: column
      align-items: center
      width: 70px
      margin: 1px
   .vector
      display: flex
      flex-direction: column
      align-items: center
      width: 70px
      margin: 1px
   .setting
      display: flex
      flex-direction: column
      align-items: center
      width: 70px
      margin: 1px
   .title
         color: white
         display: flex
         font-size: 12px
         font-weight: 600
         justify-content: flex-start
         margin: 1px
</style>
