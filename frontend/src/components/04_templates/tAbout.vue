<template>
  <div class="form-container">
    <h2 class="title">{{ formTitle }}</h2>
    <mFormElement
      v-for="(formElement, index) in formElements"
      :key="index"
      :formStyle="formElement.formStyle"
      :formTitle="formElement.formTitle"
      :formDescription="formElement.formDescription"
      :formInputType="formElement.formInputType"
      :formInputPlaceholder="formElement.formInputPlaceholder"
      :formValue="formElement.formValue"
      :inputFormValues="formElement.inputFormValues"
      :formInputStyle="formElement.formInputStyle"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import mFormElement from "@/components/02_molecules/mFormElement.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "tAbout",
  components: {
    mFormElement
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("formNewProject", ["getFormTitle", "getFormFields"]),
    formElements() {
      return this.getFormFields;
    },
    formTitle() {
      return this.getFormTitle;
    }
  }
});
</script>


<style scoped>
.about-container {
  padding: 10px;
}

.about-container h1 {
  padding-bottom: 10px;
}
</style>
