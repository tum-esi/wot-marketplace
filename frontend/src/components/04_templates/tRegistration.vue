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
      </form>
    </div>
    <div class="submit-btn">
      <aButton
        :btnClass="'login-btn'"
        :btnLabel="'Submit'"
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
import { mapActions } from "vuex";

export default Vue.extend({
  name: "tLogin",
  components: {
    aButton,
    mFormElement
  },
  data() {
    return {
      elementInputValue: "",
      formStyle: {
        title: "login-form-title"
      },
      formElements: [
        {
          formTitle: "Username*",
          formInputType: "text",
          formInputPlaceholder: "Username needs to be min. 5 characters.",
          formKey: "registrationUsername",
          formInputStyle: "login-input"
        },
        {
          formTitle: "Password*",
          formInputType: "password",
          formInputPlaceholder: "Password needs to be min. 6 characters.",
          formKey: "registrationPassword",
          formInputStyle: "login-input"
        },
        {
          formTitle: "Email*",
          formInputType: "text",
          formInputPlaceholder: "Enter email address.",
          formKey: "registrationEmail",
          formInputStyle: "login-input"
        },
        {
          formTitle: "First Name",
          formInputType: "text",
          formInputPlaceholder: "Add your first name.",
          formKey: "registrationFirstName",
          formInputStyle: "login-input"
        },
        {
          formTitle: "Last Name",
          formInputType: "text",
          formInputPlaceholder: "Add your last name.",
          formKey: "registrationLastName",
          formInputStyle: "login-input"
        }
      ],
      filledForm: []
    };
  },
  methods: {
    // TODO: 
    // - Missing required field
    // - Already registered
    // - Already logged in --> redirect to account 
    // - Too less chars on Username 
    ...mapActions("user", ["register"]),
    async submitForm() {
      if (
        this.filledForm.registrationUsername
      )
      if (
        this.filledForm.registrationUsername &&
        this.filledForm.registrationPassword &&
        this.filledForm.registrationEmail
      ) {
        // console.log("Registration: form is ok:", this.filledForm);
        let registeredUser = await this.register({
          newUser: {
            password: this.filledForm.registrationPassword,
            username: this.filledForm.registrationUsername,
            email: this.filledForm.registrationEmail,
            firstname: this.filledForm.registrationFirstName,
            lastname: this.filledForm.registrationLastName
          }
        });
        // console.log("Registration: user was registered?:", registeredUser);
        if (registeredUser) {
          // console.log("Registration: successfull!:", registeredUser);
          this.$router.push({
            name: "Account"
          });
        } else {
          // Could not 
        }
      } else {
        // FIXME: Required fields are not filled
        // console.log("Registration: please fill form");
      }
    }
  },
  watch: {
    filledForm() {
      // console.log("filledForm", this.filledForm);
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
  padding-top: 10px;
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