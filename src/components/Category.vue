<template>
   <div class="category">
      <div class="category-content" @click="click">
         <img class="category-image" :src="category.icons[0].url" />
         <p class="category-title">{{ category.name }}</p>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      category: {
         type: Object,
         required: true
      }
   },
   methods: {
      click() {
         this.$emit('click')
      }
   }
}
</script>

<style lang="sass" scoped>
.category
   display: flex
   padding: 12px
   margin: 0px
.category-content
   flex-basis: content
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
