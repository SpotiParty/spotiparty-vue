<template>
   <div class="category">
      <div class="category-content">
         <img
            class="category-image"
            src="https://upload.wikimedia.org/wikipedia/it/5/51/Immagine_13.png"
         />
         <p class="category-title">Category name</p>
      </div>
   </div>
</template>
<script>
export default {}
</script>
<style lang="sass" scoped>
.category
   display: flex
   padding: 12px
   margin: 0px
.category-content
   flex-bases: content
   flex-direction: column
   align-items: center
   display: flex
.category-image
   height: 150px
   width: 158px
.category-title
   padding: 10px 10px 0px 10px
   font-size: 18px
   font-weight: 400
   color: white
   margin: 0px
</style>
