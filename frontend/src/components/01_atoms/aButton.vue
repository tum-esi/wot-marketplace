<template>
  <button class="btn" :class="btnClass" @click="onClick">{{ btnLabel }}</button>
</template>

<script lang="ts">
import Vue from "vue";

/**
 * A basic button, emits a passed event with an optional passed value. 
 */

export default Vue.extend({
  name: "aButton",
  props: {
    /**
     * This value will be passed on btn click. Value can be anything.
     */
    btnValue: {
      type: null,
      default: null,
      required: false
    },
    /**
     * Disable this button. Button is not clickable.
     */
    btnIsDisabled: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Button label.
     */
    btnLabel: {
      type: String,
      required: true
    },
    /**
     * Action for button on click event.
     */
    btnOnClick: {
      type: String,
      required: true
    },
    /**
     * Extra css classes for the button.
     */
    btnClass: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      if (this.btnIsDisabled) {
        return;
      }

      if (this.btnValue) {
          this.$emit(this.btnOnClick, this.btnValue);  
      } else { 
          this.$emit(this.btnOnClick);
      }
    }
  }
});
</script>

<style scoped>
.search-btn {
  vertical-align: top;
  width: 150px;
  height: 50px;
  padding: 10px;
  border: none;
}

.btn-right {
  float: right;
}
</style>
