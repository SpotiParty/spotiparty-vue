<template>
   <div class="container">
      <div class="switch" :style="style">
         <div v-for="(opt, index) in options" :key="index" @click="select(index)">
            {{ opt }}
         </div>
      </div>
      <div class="selector" :style="position"></div>
   </div>
</template>

<script>
export default {
   props: {
      options: {
         type: Array,
         default() {
            return ['first', 'second']
         },
         validator: val => val.length == 2
      },
      selected: {
         type: Number,
         default: 0
      },
      width: {
         type: Number,
         default: 270
      },
      height: {
         type: Number,
         default: 56
      }
   },
   data() {
      return {
         selected_option: this.selected,
         style: {
            width: this.width + 'px',
            height: this.height + 'px'
         },
         left: 'transform: translateX(0)',
         right: 'transform: translateX(' + this.width / 2 + 'px)'
      }
   },
   computed: {
      position() {
         return !this.selected_option
            ? 'transform: translateX(0)'
            : 'transform: translateX(' + this.width / 2 + 'px)'
      }
   },
   methods: {
      select(index) {
         this.selected_option = index
      }
   }
}
</script>

<style lang="sass" scoped>
@import '@/assets/variables.scss'

.container
   position: relative
.switch
   position: relative
   display: grid
   grid-template-columns: 50% 50%
   grid-template-rows: 100%
   border-radius: 32px
   border: 2px solid map-get($colors, 'primary')
div
   display: flex
   justify-content: center
   align-items: center
   font-weight: 600
   font-size: 21px
   color: white
   z-index: 1
.selector
   position: absolute
   left: 0
   border-radius: 32px
   background-color: map-get($colors, 'primary')
   width: 50%
   height: 100%
   z-index: 0
   transition: all 0.2s ease-out
</style>
