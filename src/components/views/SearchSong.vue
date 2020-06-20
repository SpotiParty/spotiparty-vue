<template>
   <div>
      <div class="search-input">
         <SearchBar v-model="search_text"></SearchBar>
      </div>
   </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
export default {
   components: {
      SearchBar
   },
   data() {
      return {
         search_text: null
      }
   },
   watch: {
      search_text(oldValue, newValue) {
         console.log(newValue)
      }
   }
}
</script>

<style lang="sass" scoped>
.search-input
   width: 100%
   height: 56px
   padding: 5px
   box-sizing: border-box
</style>
