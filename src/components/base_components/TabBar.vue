<template>
   <div class="tab-bar">
      <p :class="button_class" @click="click">La mia playlist</p>
      <p :class="button_class" @click="click">Esplora</p>
   </div>
</template>

<script>
export default {
   methods: {
      click() {
         this.$emit('click')
      }
   }
}
</script>

<style lang="sass" scoped>
.tab-bar
    display: flax
</style>
