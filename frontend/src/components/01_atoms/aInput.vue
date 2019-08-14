<template>
  <input v-model="inputValue" :class="addClass" :type="inputType" :placeholder="placeholder" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aInput extends Vue {
  @Prop() inputType!: string;
  @Prop() placeholder?: string;
  @Prop() addClass?: string;
  @Prop() value!: string;

  get inputValue(){
    return this.value;
  }

  set inputValue(inputValue){
    this.$emit("input", inputValue);
  }
}
</script>

<style scoped>
.default {
  padding: 10px 15px;
  font-size: 0.8em;
}

.login-form {
  padding: 10px 15px;
  font-size: 1em;
}

.register-form {
  padding: 10px 15px;
  font-size: 1em;
  width: 100%;
}
</style>