<template>
  <div class="bg">
    <div class="form-container">
      <h2 class="title">{{ formTitle }}</h2>
      <mFormElement
        v-for="(formElement, index) in formElements"
        :key="index"
        v-model="filledForm[formElement.formKey]"
        :formStyle="formStyle"
        :formKey="formElement.formKey"
        :formTitle="formElement.formTitle"
        :formDescription="formElement.formDescription"
        :formInputType="formElement.formInputType"
        :formInputPlaceholder="formElement.formInputPlaceholder"
        :formValue="formElement.formValue"
        :inputFormValues="formElement.inputFormValues"
        :formInputStyle="formElement.formInputStyle"
      />
      <div class="submit-btn-container">
        <aButton
          :btnValue="filledForm"
          :btnLabel="'Create Project'"
          :btnOnClick="'form-btn-clicked'"
          :btnClass="'submit-btn'"
          v-on:form-btn-clicked="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import aButton from "@/components/01_atoms/aButton.vue";
import mFormElement from "@/components/02_molecules/mFormElement.vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "tForm",
  components: {
    aButton,
    mFormElement
  },
  data() {
    return {
      filledForm: []
    };
  },
  computed: {
    ...mapGetters("formNewProject", [
      "getFormTitle",
      "getFormFields",
      "getFormStyle"
    ]),
    formElements() {
      return this.getFormFields;
    },
    formTitle() {
      return this.getFormTitle;
    },
    formStyle() {
      return this.getFormStyle;
    }
  },
  methods: {
    submitForm() {
      console.log(this.filledForm);
      //   event.preventDefault();
    }
  }, 
  watch: {
    filledForm() {
      console.log("filledForm", this.filledForm);
    }
  }
});
</script>


<style scoped>
.form-container {
  width: 75%;
  margin: 0 auto;
  background: #fff;
}

.title {
  text-align: center;
  padding: 15px;
  border-bottom: 1px solid #999;
  margin-bottom: 5px;
}

.submit-btn-container {
  clear: both;
  width: 100%;
  display: inline-block;
  text-align: right;
  padding: 10px;
  border-top: 1px solid #999;
  margin-top: 10px;
}
</style>
