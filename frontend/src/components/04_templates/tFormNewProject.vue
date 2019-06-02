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
        :formOnClick="formElement.formOnClick"
        v-on:on-required-input-clicked="hasErrors = false"
      />
      <div class="submit-btn-container">
        <span
          :class="{ 'invisible' : !hasErrors }"
          class="error-mgs"
        >Please fill out all required fields in this form.</span>
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
      hasErrors: false,
      filledForm: {
        name: "",
        shortDescription: "",
        longDescription: "",
        github: "",
        td: "",
        topic: [],
        implementation: "",
        platform: "",
        tags: [],
        complexity: ""
      }
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
    ...mapActions("project", ["addNewProject"]),
    async submitForm() {
      // eslint-disable-next-line
      if (
        this.filledForm.name &&
        this.filledForm.shortDescription &&
        this.filledForm.longDescription
      ) {
        console.log("filledForm", this.filledForm);
        let newProject = await this.addNewProject({
          newProject: this.filledForm
        });
        if (newProject) {
          this.$router.push({
            name: "Project",
            params: { id: newProject.name }
          });
        }
      } else {
        this.hasErrors = true;
      }
    }
  },
  watch: {
    filledForm() {
      // eslint-disable-next-line
      console.log("filledForm watch", this.filledForm);
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
  display: flex;
  align-items: baseline;
  padding: 10px;
  border-top: 1px solid #999;
  margin-top: 10px;
}

.error-mgs {
  color: red;
}
</style>
