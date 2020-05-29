<template>
   <div class="party-setup fullscreen">
      <h1>Logged in correctly</h1>
      <h2>Il codice del tuo party è {{ party.party_code }}</h2>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Utils from '@/utils.js'

export default {
   computed: {
      ...mapState('party', ['party'])
   },
   methods: {
      ...mapActions('user', ['setToken', 'setUser']),
      ...mapActions('party', ['createParty'])
   },
   created() {
      const token = this.$route.hash.split('=')[1].split('&')[0]
      this.setToken(token)
      this.setUser()
      const party_code = Utils.generatePartyCode()
      this.createParty(party_code)
   }
}
// TODO ordinare lo stile per nome
</script>

<style lang="sass" scoped>
.party-setup
   display: flex
   flex-direction: column
   justify-content: center
   align-items: center
</style>
