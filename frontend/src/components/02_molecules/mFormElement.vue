<template>
  <div class="form-el-container" :class="addClass">
    <aLabel class="form-el-left" :addClass="addClass" :addDesc="labelDescription">{{ labelContent }}</aLabel>
    <div class="form-el-right" :class="addClass">
      <aInput
        v-model="elemValue"
        :addClass="addClass"
        :inputType="inputType"
        :placeholder="inputPlaceholder"
        :radioOptions="radioOptions"
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
  @Prop() private radioOptions?: string[];
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
  text-align: center;
  grid-template-columns: 0.8fr 2fr;
  margin: 10px;
}

.login-form.form-el-right {
  margin: auto 10px;
}

.register-form.form-el-container {
  display: grid;
  grid-template-columns: 135px 300px;
  text-align: center;
  margin: 10px;
}

.register-element.form-el-right {
  margin: auto 10px;
}

.contribute-form.form-el-container {
  display: grid;
  grid-template-columns: 400px 600px;
  margin: 10px;
}

.contribute-element.form-el-right {
  margin: auto 10px;
}
</style>