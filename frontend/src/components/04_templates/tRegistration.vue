<template>
  <div class="registration-container">
    <h2>Register to WoTify</h2>
    <p>Fields marked with * are mandatory</p>
    <div class="form-container">
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
          v-on:input-clicked="resetErrors"
        />
      </form>
      <span :class="{ 'invisible' : !hasErrors }" class="error-mgs">{{ errorMessage }}</span>
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
      hasErrors: false,
      errorMessage: "",
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
    ...mapActions("user", ["register"]),
    async submitForm() {
      this.resetErrors();
      if (
        !this.filledForm.registrationUsername ||
        !this.filledForm.registrationPassword ||
        !this.filledForm.registrationEmail
      ) {
        this.showErrors("Please fill in all required fields.");
      } else if (
        this.filledForm.registrationUsername &&
        this.filledForm.registrationPassword &&
        this.filledForm.registrationEmail
      ) {
        if (this.filledForm.registrationUsername.split('').length < 5) {
          console.log(this.filledForm.registrationUsername);
          this.showErrors("Username needs to be at least 5 characters.");
        } else if (this.filledForm.registrationEmail.split('').indexOf('@') === -1) {
          this.showErrors("Please check your email adress.");
        } else {
          let registeredUser = await this.register({
            newUser: {
              password: this.filledForm.registrationPassword,
              username: this.filledForm.registrationUsername,
              email: this.filledForm.registrationEmail,
              firstname: this.filledForm.registrationFirstName,
              lastname: this.filledForm.registrationLastName
            }
          });
          if (registeredUser.error) {
            this.showErrors(registeredUser.error);
          } else if (registeredUser.username) {
            console.log("REGISTER:", registeredUser);
            this.$router.push({
              name: "Account"
            });
          } else {
            this.showErrors(
              "Registration currently not possible. Please try again later."
            );
          }
        }
      } else {
        this.showErrors(
          "Registration currently not possible. Please try again later."
        );
      }
    },
    showErrors(errMsg) {
      this.hasErrors = true;
      this.errorMessage = errMsg;
    },
    resetErrors() {
      this.hasErrors = false;
      this.errorMessage = "";
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
.form-container {
  text-align: center;
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
  padding-top: 10px;
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
  padding: 5px 0 10px 0;
}

.error-mgs {
  color: #ff4c4b;
}
</style>