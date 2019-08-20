<template>
  <div @mouseenter="showDropDown=true" @mouseleave="showDropDown=false" :class="addClass">
    <div :class="addClass" class="drop-down-label">
      <slot name="dropDownLabel"></slot>
    </div>
    <div
      class="options"
      :class="addClass"
      v-show="showDropDown"
      @click="closeOnClick ? showDropDown=false : null"
    >
      <slot name="dropDownOptions"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aNavLink from "@/components/01_atoms/aNavLink.vue";

@Component({
  components: {
    aNavLink
  }
})
export default class mDropDown extends Vue {
  @Prop() private addClass?: string;
  @Prop() private closeOnClick!: boolean;

  private showDropDown!: boolean;

  constructor() {
    super();
    this.showDropDown = false;
  }
}
</script>

<style scoped>
.default {
  display: inline-block;
  overflow: hidden;
}

.default.drop-down-label {
  vertical-align: top;
  text-decoration: none;
  text-align: center;
  outline: none;
  width: 150px;
  height: 50px;
  padding: 10px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  font-size: 20px;
  border-radius: 3px;
}

.default.drop-down-label:hover {
  background: #333;
}

.default.options {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  justify-items: center;
}

.search-filter {
  display: inline-block;
  overflow: hidden;
}

.search-filter.drop-down-label {
  vertical-align: top;
  text-decoration: none;
  text-align: center;
  outline: none;
  color: #1c1c1c;
  border: none;
  font-size: 0.9em;
  margin: 0 1vw;
  padding: 0 1vw;
  border-radius: 1vw;
}

.search-filter.drop-down-label:hover {
  background: #30b8a3;
  color: #fff;  
}

.search-filter.options {
  display: block;
  position: absolute;
  width: 45vw;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  justify-items: center;
  border-radius: 1vw;
}
</style>