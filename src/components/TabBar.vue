<template>
   <div class="tab-bar">
      <router-link :to="{ name: 'player' }">
         <div :class="{ active: this.$router.currentRoute.name == 'Player', player: true }">
            <BaseIcon width="27" height="27" viewBox="0 0 27 27">
               <Player />
            </BaseIcon>
            <div class="title">Player</div>
         </div>
      </router-link>

      <router-link :to="{ name: 'Ciao' }">
         <div :class="{ active: this.$router.currentRoute.name == 'Ciao', vector: true }">
            <BaseIcon width="27" height="27" viewBox="0 0 27 27" color="#ffffff">
               <Vector />
            </BaseIcon>
            <div class="title">Votazione</div>
         </div>
      </router-link>

      <router-link :to="{ name: 'Nati <3' }">
         <div :class="{ active: this.$router.currentRoute.name == 'Nati', setting: true }">
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
         color: #d9d9d9
         display: flex
         font-size: 12px
         font-weight: 600
         justify-content: flex-start
         margin: 1px
.active
   color: white
</style>
