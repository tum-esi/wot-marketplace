<template>
  <div class="form-el-container">
    <div class="form-el-left">
      <aLabel>{{ labelContent }}</aLabel>
      <p v-if="labelDescription">{{ labelDescription }}</p>
    </div>
    <div class="form-el-right">
      <aInput
        v-model="elemValue"
        :addClass="'default'"
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
export default class mFormElement extends Vue{
  @Prop() private labelContent!: string;
  @Prop() private labelDescription?: string;
  @Prop() private inputType!: string;
  @Prop() private inputPlaceholder!: string;
  @Prop() private addClass?: string;
  @Prop() private value!: string;

  get elemValue(){
    return this.value;
  }

  set elemValue(elemValue){
    this.$emit("input", elemValue);
  }
}
</script>

<style scoped>
.form-el-container {
  text-align: center;
  margin: 10px;
}

.form-el-left {
  text-align: right;
  margin: 0 10px;
  display: inline-block;
}

.form-el-right {
  margin: 0 10px;
  display: inline-block;
}
</style>