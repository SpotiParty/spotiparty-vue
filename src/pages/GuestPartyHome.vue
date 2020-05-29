<template>
   <div class="party-setup fullscreen">
      <h1>Benvenuto nel party</h1>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
   computed: {
      ...mapState('party', ['party'])
   },
   methods: {
      ...mapActions('user', ['setToken', 'setUser']),
      ...mapActions('party', ['createParty'])
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
