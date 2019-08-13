<template>
  <div v-on:mouseenter="showDropDown=!showDropDown">
    <slot name="dropDownLabel"></slot>
    <div class="options" v-if="showDropDown">
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
  private showDropDown!: boolean;

  constructor() {
    super();
    this.showDropDown = false;
  }
}
</script>

<style scoped>
</style>