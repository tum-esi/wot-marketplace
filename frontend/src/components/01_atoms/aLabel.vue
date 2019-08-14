<template>
  <label :class="addClass" :for="labelFor" :form="form">
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aButton extends Vue {
  @Prop() labelFor?: string;
  @Prop() form?: string;
  @Prop() addClass?: string;
}
</script>

<style scoped>
.login-form{
  font-size: 1.3em;
}

.register-form{
  font-size: 1.3em;
}
</style>