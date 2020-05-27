<template>
   <div class="playlist">
      <img
         class="playlist-image"
         :src=""
      />
      <p class="playlist-title">Nome playlist</p>
   </div>
</template>
<script>
export default {

}
</script>
<style lang="sass" scoped>
.playlist
   display: flex
   align-items: center
   margin: 12px
.playlist-image
    width: 80px
    height: 80px
    margin-top: 0px
.playlist-title
   padding: 20px
   font-size: 24px
   font-weight: 400
   color: white
   margin: 0px
</style>
