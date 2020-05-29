<template>
   <div :style="style">
      <input
         @focusin="focusin"
         @input="updateValue"
         v-on="listeners"
         :type="type"
         :placeholder="placeholder"
         :class="{ error: error }"
         :value="value"
      />
   </div>
</template>

<script>
export default {
   props: {
      height: {
         type: Number,
         default: 56
      },
      width: {
         type: Number,
         default: 200
      },
      type: {
         type: String,
         default: 'text'
      },
      placeholder: {
         type: String,
         default: 'Placeholder'
      },
      value: {
         type: String,
         default: ''
      },
      error: {
         type: Boolean,
         default: false
      }
   },
   data() {
      return {
         style: {
            height: this.height + 'px',
            width: this.width + 'px'
         }
      }
   },
   computed: {
      listeners() {
         return {
            ...this.$listeners,
            input: this.updateValue
         }
      }
   },
   methods: {
      focusin() {
         this.$emit('focusin', event)
      },
      updateValue(event) {
         this.$emit('input', event.target.value)
      }
   }
}
</script>

<style></style>
