<template>
  <div class="form-container" :class="addClass">
    <mFormElement
      v-for="element in formFields"
      :key="element.id"
      v-model="formInputData[element.variable]"
      :labelContent="element.label"
      :labelDescription="element.desc"
      :inputType="element.type"
      :inputPlaceholder="element.placeholder"
      :addClass="addClass"
    />
    <aButton
      :addClass="addClass"
      :btnEvent="'form-btn-clicked'"
      @form-btn-clicked="submitFunction(formInputData)"
    >{{ buttonLabel }}</aButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import mFormElement from "@/components/02_molecules/mFormElement.vue";
import aButton from "@/components/01_atoms/aButton.vue";

@Component({
  components: {
    mFormElement,
    aButton
  }
})
export default class oRegisterForm extends Vue {
  @Prop() private formFields!: [{ [key: string]: any}];
  @Prop() private buttonLabel!: string;
  @Prop() private submitFunction!: Function;
  @Prop() private addClass?: string;

  private formInputData = {}
}
</script>

<style scoped>
.form-container {
  display: grid;
  justify-items: center;
}
</style>