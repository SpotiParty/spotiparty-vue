<template>
   <div class="host-party-home fullscreen">
      {{ this.current_playlist }}
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   computed: {
      ...mapState('party', ['current_playlist'])
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
