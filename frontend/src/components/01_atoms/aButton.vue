<template>
  <button class="btn" :class="addClass" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aButton extends Vue {
  @Prop({ default: null }) btnValue?: any;
  @Prop({ default: false }) isDisabled?: boolean;
  @Prop() btnEvent!: string;
  @Prop() addClass?: string;

  onClick() {
    if (this.isDisabled) return;
    if (this.btnValue) return this.$emit(this.btnEvent, this.btnValue);
    this.$emit(this.btnEvent);
  }
}
</script>

<style scoped>
.login-btn {
  text-align: center;
  outline: none;
  width: 150px;
  height: 35px;
  padding: 5px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  font-size: 15px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
}

.login-btn:hover {
  background: #333;
}
</style>