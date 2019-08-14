<template>
  <div class="form-el-container" :class="addClass">
    <div class="form-el-left" :class="addClass">
      <aLabel :addClass="addClass">{{ labelContent }}</aLabel>
      <p v-if="labelDescription" :class="addClass">{{ labelDescription }}</p>
    </div>
    <div class="form-el-right" :class="addClass">
      <aInput
        v-model="elemValue"
        :addClass="addClass"
        :inputType="inputType"
        :placeholder="inputPlaceholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aLabel from "@/components/01_atoms/aLabel.vue";
import aInput from "@/components/01_atoms/aInput.vue";

@Component({
  components: {
    aLabel,
    aInput
  }
})
export default class mFormElement extends Vue {
  @Prop() private labelContent!: string;
  @Prop() private labelDescription?: string;
  @Prop() private inputType!: string;
  @Prop() private inputPlaceholder!: string;
  @Prop() private addClass?: string;
  @Prop() private value!: string;

  get elemValue() {
    return this.value;
  }

  set elemValue(elemValue) {
    this.$emit("input", elemValue);
  }
}
</script>

<style scoped>
.login-form.form-el-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  text-align: center;
  margin: 10px;
}

.login-form.form-el-left {
  text-align: right;
  margin: auto 10px;
}

.login-form.form-el-right {
  margin: auto 10px;
}

.register-form.form-el-container {
  display: grid;
  grid-template-columns: 140px 400px;
  text-align: center;
  margin: 10px;
}

.register-form.form-el-left {
  text-align: right;
  margin: auto 10px;
}

.register-form.form-el-left p {
  font-size: 12px;
  margin: 0;
  line-height: 1.1em;
}

.register-element.form-el-right {
  margin: auto 10px;
}
</style>