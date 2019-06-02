<template>
  <button
    class="link-btn"
    :class="{ 'underlined' : linkBtnIsActive }"
    @click="onClick"
  >{{ linkBtnLabel }}</button>
</template>

<script lang="ts">
import Vue from "vue";

/**
 * A basic router link button, emits a passed event with an optional passed value.
 */

export default Vue.extend({
  name: "aLinkButton",
  props: {
    /**
     * This value will be passed on btn click. Value can be anything.
     */
    linkBtnValue: {
      type: null,
      default: null,
      required: false
    },
    /**
     * This nav element is currently selected and will be shown underlined.
     */
    linkBtnIsActive: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Button label.
     */
    linkBtnLabel: {
      type: String,
      required: true
    },
    /**
     * Action for button on click event.
     */
    linkBtnOnClick: {
      type: String,
      required: true
    },
    /**
     * Extra css classes for the button.
     */
    linkBtnClass: {
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
      if (this.linkBtnValue) {
        this.$emit(this.linkBtnOnClick, this.linkBtnValue);
      } else {
        this.$emit(this.linkBtnOnClick);
      }
    }
  }
});
</script>

<style scoped>
.link-btn {
  vertical-align: top;
  width: 150px;
  height: 50px;
  padding: 10px;
  background: #1C1C1C;
  color: #fff;
  border: none;
  font-size: 20px;
  border-radius: 3px;
}

.link-btn:hover {
  background: #333;
}

.link-btn:focus {
  outline: none;
  outline-offset: none;
}

.underlined {
  padding-bottom: 7px;
  border-bottom: 3px solid #30b8a3;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
}

.footer-btn {
  font-size: 10px;
}
</style>
