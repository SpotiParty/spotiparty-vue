<template>
   <div class="tab-selector">
      <div
         v-for="(tab, index) in tabs"
         :key="index"
         class="tab-element"
         @click="selectTab(index)"
      >
         <span class="tab-element-title">
            {{ tab }}
         </span>
         <transition name="fade" mode="out-in">
            <div v-if="selected_tab == index" class="active-line"></div>
         </transition>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      tabs: {
         type: Array,
         required: true
      },
      selected: {
         type: Number,
         default: 0
      }
   },
   data() {
      return {
         selected_tab: this.selected
      }
   },
   methods: {
      selectTab(index) {
         this.selected_tab = index
         this.$emit('tab-selected', index)
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'
@import '@/assets/animations.sass'

.tab-selector
   display: flex
   justify-content: flex-start
   margin: 24px 0px 20px 0px
   >.tab-element
      display: flex
      flex-direction: column
      color: white
      margin: 0px 30px 0px 0px
      >.active-line
         width: 100%
         height: 3px
         margin: 5px 0px 0px 0px
         background-color: map-get($colors, "primary")
</style>
