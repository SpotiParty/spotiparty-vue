<template>
   <div class="category-list">
      <div v-for="category in categories" :key="category.id">
         <Category :category="category" />
      </div>
   </div>
</template>

<script>
import Category from '@/components/Category.vue'
import { mapState, mapActions } from 'vuex'

export default {
   components: {
      Category
   },
   computed: {
      ...mapState('browse', ['categories'])
   },
   methods: {
      ...mapActions('browse', ['getCategories'])
   },
   created() {
      if (this.categories.length == 0) {
         this.getCategories()
      }
   }
}
</script>

<style lang="sass" scoped>
.category-list
   display: flex
   flex-wrap: wrap
</style>
