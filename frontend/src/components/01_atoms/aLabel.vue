<template>
  <div :class="addClass">
    <label :class="addClass" :for="labelFor" :form="form">
      <slot></slot>
    </label>
    <p v-if="addDesc" :class="addClass">{{ addDesc }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aLabel extends Vue {
  @Prop() labelFor?: string;
  @Prop() addDesc?: string;
  @Prop() form?: string;
  @Prop() addClass?: string;
}
</script>

<style scoped>
.login-form.form-el-left {
  text-align: right;
  margin: auto 10px;
}

.login-form label {
  font-size: 1.3em;
}

.register-form.form-el-left {
  text-align: right;
  margin: auto 10px;
}

.register-form label {
  font-size: 1.3em;
}

.register-form p {
  font-size: 12px;
  margin: 0;
  line-height: 1.1em;
}

.contribute-form.form-el-left {
  text-align: left;
  vertical-align: top;
}

.contribute-form label {
  font-size: 1.3em;
}

.contribute-form p {
  font-size: 12px;
  margin: 0;
  line-height: 1.1em;
}

div.project-tag-top {
  height: 100px;
  padding: 10px;
}

.project-tag-top label {
  font-weight: 700;
}

.project-tag-top p {
  color: gray;
  margin: 5px 0;
}
</style>