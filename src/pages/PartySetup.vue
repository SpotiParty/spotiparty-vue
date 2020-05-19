<template>
   <div class="party-setup fullscreen">
      <h1>Logged in correctly</h1>
   </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   data() {
      return {
         token: this.$route.hash.split('=')[1].split('&')[0]
      }
   },
   methods: {
      ...mapActions('user', ['setToken', 'setUser'])
   },
   created() {
      this.setToken(this.token)
      this.setUser()
   }
}
</script>

<style lang="sass" scoped>
.party-setup
   display: flex
   justify-content: center
   align-items: center
</style>
