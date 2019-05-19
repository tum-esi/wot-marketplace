<template>
  <div class="form-element">
    <div class="form-el-left">
      <label class="form-el-title">{{ formTitle }}</label>
      <p class="form-el-description">{{ formDescription }}</p>
    </div>
    <aInput
      class="form-el-right"
      v-model="currentValue"
      :inputType="inputType"
      :inputPlaceholder="inputPlaceholder"
      :inputFormValue="formInputValue"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import aInput from "@/components/01_atoms/aInput.vue";

export default Vue.extend({
  name: "mFormelement",
  components: {
    aInput
  },
  props: {
    /**
     * Title of form element.
     */
    formTitle: {
      type: String,
      required: true
    },
    /**
     * Short description of form element below title.
     */
    formDescription: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * Type of input element.
     */
    formInputType: {
      type: String,
      required: true,
      validator: (value: string) =>
        ["textarea", "checkbox", "radio", "text"].indexOf(value) !== -1
    },
    /**
     * Placeholder for input fields.
     */
    formInputPlaceholder: {
      type: String,
      required: false,
      default: null
    },
    /**
     * Inital input value. Can be an array for checkboxes.
     */
    formValue: {
      type: [String, Array, Boolean],
      required: false,
      default: null
    },
    /**
     * Value for single form element. E.g. checkbox option.
     */
    formInputValue: {
      type: [String, Number],
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentValue: this.formValue
    };
  },
  watch: {
      value(v) {
          this.currentValue = v;
      }, 
      currentValue() {
          this.$emit('input', this.currentValue)
      }
  }
});
</script>


<style scoped>
</style>
