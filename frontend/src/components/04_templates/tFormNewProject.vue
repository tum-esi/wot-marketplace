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
        >{errorMessage}</span>
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
      errorMessage: "",
      hasErrors: false,
      filledForm: {
        name:  undefined,
        shortDescription:  undefined,
        longDescription:  undefined,
        github:  undefined,
        td:  undefined,
        topic:  undefined,
        implementationType: "code",
        platform: "other",
        tags:  undefined,
        complexity: undefined
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
    // Possible errors on form validation: 
    // - missing required field
    // - td has the wrong format
    // - user is not logged in --> disable button maybe
    // - title not long enough, etc. 
    
    ...mapActions("project", ["addNewProject", "loadProject"]),
    async submitForm() {
      if (
        this.filledForm.name &&
        this.filledForm.shortDescription &&
        this.filledForm.longDescription &&
        this.filledForm.td && 
        this.filledForm.implementationType &&
        this.filledForm.platform
      ) {
        try {
          this.filledForm.td = JSON.parse(this.filledForm.td);
        } catch(error) {
          this.showErrors("Please provide your Thing Description in valid JSON format.")
          return;
        }
        let response = await this.addNewProject({
          newProject: this.filledForm
        });
        if (response['error']) {
          this.showErrors(response.error); 
        } else {
          let newProject = await this.loadProject({
            projectId: this.filledForm.name
          });
          if (newProject) {
            this.$router.push({
              name: "Project",
              params: { id: newProject.name }
            });
          } else {
            this.showErrors(newProject.error);
          }
        }
      } else {
        this.showErrors();
      }
    }, 
    showErrors(errorMsg) {
      let standardErrorMssg = "Please fill out all required fields in this form."
      this.hasErrors = true;
      this.errorMessage = errorMsg ? errorMsg : standardErrorMssg;
    }
  },
  watch: {
    filledForm() {
      // eslint-disable-next-line
      // console.log("filledForm watch", this.filledForm);
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
