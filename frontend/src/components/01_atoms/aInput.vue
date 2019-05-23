<template>
  <textarea v-if="inputType === 'textarea'" :placeholder="inputPlaceholder" :class="inputStyle"/>
  <input v-else-if="inputType === 'checkbox'" :value="inputFormValue" :class="inputStyle" type="checkbox">
  <input v-else-if="inputType === 'radio'" type="radio">
  <input v-else type="text" :placeholder="inputPlaceholder" :class="inputStyle">
</template>

<script lang="ts">
import Vue from "vue";

/**
 * A basic input field for a form. Can be a textarea, checkbox, radiobutton or basic input field.
 */

export default Vue.extend({
  name: "aInput",
  props: {
    /**
     * Type of input element.
     */
    inputType: {
      type: String,
      required: true,
      validator: value =>
        ["textarea", "checkbox", "radio", "text"].indexOf(value) !== -1
    },
    /**
     * Placeholder for text input fields.
     */
    inputPlaceholder: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Inital input value. Can be an array for checkboxes.
     */
    inputValue: {
      type: [String, Array, Boolean],
      required: false,
      default: null
    },
    /**
     * Value for single form element. E.g. checkbox option.
     */
    inputFormValue: {
      type: [String, Number],
      required: false,
      default: null
    }, 
    /**
     * Optional css class for input field. 
     */
    inputStyle: {
        type: String, 
        required: false, 
        default: ""
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.inputValue;
      },
      set(val) {
        this.$emit("input", val, this.inputFormValue);
      }
    }
  }
});
</script>

<style scoped>
</style>
