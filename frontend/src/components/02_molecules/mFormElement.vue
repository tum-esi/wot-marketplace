<template>
  <div :class="formStyle.wholeEl">
    <div :class="formStyle.leftEl">
      <label class="form-el-title">{{ formTitle }}</label>
      <p class="form-el-description">{{ formDescription }}</p>
    </div>
    <aInput
      :class="formStyle.rightEl"
      v-model="currentValue"
      :inputType="formInputType"
      :inputPlaceholder="formInputPlaceholder"
      :inputFormValues="inputFormValues"
      :inputStyle="formInputStyle"
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
     * Custom css class for styling of form element.
     */
    formStyle: {
      // type: Object as () => { wholeEl: string, leftEl: string, rightEl: string },
      required: false,
      default: ""
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
      validator: value =>
        ["textarea", "checkbox", "radio", "text", "tag"].indexOf(value) !== -1
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
     * Value for single form elements. E.g. checkbox options.
     */
    inputFormValues: {
      type: [String, Number, Array],
      required: false,
      default: null
    },
    /**
     * Css classes for your form input. E.g 'textarea-large'
     */
    formInputStyle: {
      type: String,
      required: false
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
      this.$emit("input", this.currentValue);
    }
  }
});
</script>


<style scoped>
.big-form-el {
  width: 100%;
  clear: both;
}

.big-form-el-left {
  width: 25%;
  display: box;
  box-sizing: border-box;
  float: left;
  padding: 10px 0 10px 10px;
}

.big-form-el-right {
  width: 75%;
  float: left;
  padding: 10px 10px 0 10px;
}
/* .textarea-large {

}

.textarea-medium {

} */
</style>
