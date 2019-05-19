<template>
  <div class="form-container">
    <h2 class="title">Add a new WoT project to WoTify</h2>
    <form @submit="submitForm" class="form">
      <mFormElement
        v-for="(formElment, index) in formElements"
        :key="index"
        v-model="elementInputValue"
        :formTitle="formElment.title"
        :formDescription="formElment.description"
        :formInputType="formElment.formInputType"
        :formInputPlaceholder="formElment.formInputPlaceholder"
        :formValue="formElment.formValue"
        :formInputValue="formElment.formInputValue"
      />
    </form>
    <aButton
      :btnValue="filledForm"
      :btnLabel="formBtnLabel"
      :btnOnClick="'form-btn-clicked'"
      v-on:form-btn-clicked="submitForm"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import aButton from "@/components/01_atoms/aButton.vue";
import mFormElement from "@/components/02_molecules/mFormElement.vue";

export default Vue.extend({
  name: "tForm",
  components: {
    aButton,
    mFormElement
  },
  props: {
    /**
     * Title which is displayed on top of the form.
     */
    formTitle: {
      type: String,
      required: true
    },
    /**
     * Label of submit button.
     */
    formBtnLabel: {
      type: String,
      required: true
    },
    filledForm: {}
  },
  data() {
    return {
      elementInputValue: "",
      formElements: [
        {
          title: "Title",
          description: "asdasd",
          formInputType: "text",
          formInputPlaceholder: "dfgswg"
        }
      ]
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
    }
  }
});
</script>

<style scoped>
.title {
}

.form {
}
</style>
