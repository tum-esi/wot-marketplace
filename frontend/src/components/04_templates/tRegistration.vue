<template>
  <div class="registration-container">
    <h2>Register to WoTify</h2>
    <p>Fields marked with * are mandatory</p>
    <div>
    <form @submit="submitForm" class="form">
      <mFormElement
        v-for="(formElement, index) in formElements"
        :key="index"
        v-model="filledForm[formElement.formKey]"
        :formStyle="''"
        :formKey="formElement.formKey"
        :formTitle="formElement.formTitle"
        :formDescription="formElement.formDescription"
        :formInputType="formElement.formInputType"
        :formInputPlaceholder="formElement.formInputPlaceholder"
        :formValue="formElement.formValue"
        :inputFormValues="formElement.inputFormValues"
        :formInputStyle="formElement.formInputStyle"
      />
    </form>
    </div>
    <div class="submit-btn">
    <aButton class="submit-text"
      :btnValue="filledForm"
      :btnLabel="formBtnLabel"
      :btnOnClick="'form-btn-clicked'"
      v-on:form-btn-clicked="submitForm"
    />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import aButton from "@/components/01_atoms/aButton.vue";
import mFormElement from "@/components/02_molecules/mFormElement.vue";

export default Vue.extend({
  name: "tLogin",
  components: {
    aButton,
    mFormElement
  },
  props:{
    // formBtnLabel: {
    //   type: String,
    //   required: true
    // },
    // filledForm: {}
  },
  data(){
    return{
      formBtnLabel: "Submit",
      elementInputValue: "",
      formElements: [
        {
          formTitle: "Username*",
          formInputType: "text",
          formInputPlaceholder: "Choose a new username",
          formKey: "registrationUsername"
        },
        {
          formTitle: "Password*",
          formInputType: "password",
          // formDescription:"It should be minimum 6 characters",
          formInputPlaceholder: "Choose a password of minimum 6 characters",
          formKey: "registrationPassword"
        },
        {
          formTitle: "Email*",
          formInputType: "text",
          formInputPlaceholder: "Provide your email",
          formKey: "registrationEmail"
        },
        {
          formTitle: "First Name",
          formInputType: "text",
          formInputPlaceholder: "Not visible to others",
          formKey: "registrationFirstName"
        },
        {
          formTitle: "Last Name",
          formInputType: "text",
          formInputPlaceholder: "Not visible to others",
          formKey: "registrationLastName"
        }
      ],
      filledForm: []
    }
  },
  methods: {
    submitForm() {
      var userData = {
        username:"",
        password:""
      };
      userData.username = this.formElements[0].formValue;

      console.log("submitttted: ",userData);
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
.registration-container {
  padding: 10px;
}

.registration-container h2 {
  padding-bottom: 10px;
  padding-top: 30px;
  text-align: center;
}
.registration-container p {
  font-size: x-small;
  text-align: center;
}
.submit-btn {
  text-align: center;
}
.submit-text {
  margin-left: auto;
  margin-right: auto;
  padding-top: 1px;
  padding-bottom: 3px;
  width: 15%; 
}
.form {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding-top: 1px;
  padding-bottom: 3px;
}
</style>