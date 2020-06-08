<template>
   <div></div>
</template>

<script>
export default {
   async created() {
      const party_code = this.guestSpotifyLogin()
      const token = this.$route.hash.split('=')[1].split('&')[0]
      await this.setToken(token)
      await this.setUser()
      this.$router.push({
         name: 'GuestPartyHome',
         params: {
            id: party_code
         }
      })
   }
}
</script>

<style lang="sass" scoped></style>
