<template>
  <!-- Textarea -->
  <textarea v-if="inputType === 'textarea'" :placeholder="inputPlaceholder" :class="inputStyle"/>

  <!-- Checkboxes: multiple selection is possible -->
  <div v-else-if="inputType === 'checkbox'">
    <div v-for="(inputFormValueElement, index) in inputFormValues" :key="index">
      <input
        class="checkbox-el"
        :class="inputStyle"
        :value="inputFormValueElement"
        :id="inputFormValueElement"
        type="checkbox"
      >
      <label class="checkbox-label" :for="inputFormValueElement">{{ inputFormValueElement }}</label>
    </div>
  </div>

  <!-- Radio elements: only single option -->
     <div v-else-if="inputType === 'radio'">
    <div v-for="(inputFormValueElement, index) in inputFormValues" :key="index">
      <input
        class="radio-el"
        :class="inputStyle"
        :value="inputFormValueElement"
        :id="inputFormValueElement"
        type="radio"
      >
      <label class="radio-label" :for="inputFormValueElement">{{ inputFormValueElement }}</label>
    </div>
  </div>


  <!-- Tags -->
  <div v-else-if="inputType === 'tag'">
    <ul class="add-tags">
      <li>
        <input type="text">
      </li>
    </ul>
  </div>

  <!-- Normal text input -->
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
        ["textarea", "checkbox", "radio", "text", "tag"].indexOf(value) !== -1
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
    inputFormValues: {
      //   type: [String, Number],
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
