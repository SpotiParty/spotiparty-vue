<template>
   <div class="host-party-home fullscreen">
      <router-view></router-view>
      <TabBar />
      <button @click="goToPlayer">Vai al player</button>
   </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import { mapState } from 'vuex'

export default {
   components: {
      TabBar
   },
   computed: {
      ...mapState('party', ['party_playlist'])
   },
   methods: {
      goToPlayer() {
         this.$router.push({ name: 'HostPlayer' })
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
