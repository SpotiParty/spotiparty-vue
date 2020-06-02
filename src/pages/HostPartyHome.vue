<template>
   <div class="host-party-home fullscreen">
      <router-view></router-view>
      <button @click="goToPlayer">Vai al player</button>
      <!-- Tab bar da inserire -->
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   computed: {
      ...mapState('party', ['party_playlist'])
   },
   methods: {
      goToPlayer() {
         this.$router.push({
            name: 'HostPlayer',
            params: {
               track: this.party_playlist.tracks[0]
            }
         })
      }
   }
}
</script>

<style lang="sass" scoped>
.host-party-home
   align-items: center
   color: white
   display: flex
   flex-direction: column
   justify-content: center
   .demo
      color: white
</style>
