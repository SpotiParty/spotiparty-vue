<template>
   <div>
      <router-view></router-view>
      <Tab-bar />
   </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'

export default {
   components: {
      TabBar
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
