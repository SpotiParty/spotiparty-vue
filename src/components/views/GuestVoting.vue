<template>
   <div>Guest Voting</div>
   <!-- componente canzone -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
   data() {
      // voted_song: null
   },
   methods: {
      ...mapActions('party', ['addVote', 'removeVote']),
      vote(uri) {
         if (this.voted_song == null) {
            this.addVote(uri)
            this.voted_song = uri
         } else {
            this.removeVote(this.voted_song)
            this.voted_song = uri
            this.addVote(uri)
         }
      }
   }
}
</script>

<style lang="sass" scoped></style>
