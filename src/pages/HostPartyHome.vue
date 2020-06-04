<template>
   <div class="host-party-home fullscreen">
      <router-view></router-view>
      <TabBar class="tab" />
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
   created() {
      if (this.$router.currentRoute.name != 'HostPlayer') {
         this.$router.push({ name: 'HostPlayer' })
      }
   }
}
</script>

<style lang="sass" scoped>
.host-party-home
   align-items: space-between
   color: white
   display: flex
   flex-direction: column
   justify-content: flex-start
   .tab
      position: fixed
      bottom: 0px
</style>
