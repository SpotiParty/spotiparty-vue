<template>
   <div>
      <router-view></router-view>
      <GuestTabBar />
   </div>
</template>

<script>
import GuestTabBar from '@/components/GuestTabBar.vue'
import { mapActions } from 'vuex'

export default {
   components: {
      GuestTabBar
   },
   methods: {
      ...mapActions('party', ['getPartyPlaylistTracks'])
   },
   created() {
      if (this.$router.currentRoute.name != 'GuestPlayer') {
         this.$router.push({ name: 'GuestPlayer' })
      }
      this.getPartyPlaylist()
   }
}
</script>

<style lang="sass" scoped>
.party-setup
   align-items: center
   display: flex
   flex-direction: column
   justify-content: center
.tab-bar
   position: fixed
   bottom: 0
</style>
