<template>
  <div class="login-container">
    <h2>Login to WoTify</h2>
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
        :btnLabel="'Login'"
        :btnOnClick="'form-btn-clicked'"
        v-on:form-btn-clicked="submitForm"
      />
    </div>
    <div class="register-btn">
      <aButton
        :btnClass="'login-btn'"
        :btnLabel="'Register'"
        :btnOnClick="'form-btn-clicked'"
        v-on:form-btn-clicked="goToRegister"
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
          formTitle: "Username",
          formInputType: "text",
          formInputPlaceholder: "Type your username",
          formKey: "username",
          formInputStyle: "login-input"
        },
        {
          formTitle: "Password",
          formInputType: "password",
          formInputPlaceholder: "Type your password",
          formKey: "password",
          formInputStyle: "login-input"
        }
      ],
      filledForm: []
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    async submitForm() {
      this.resetErrors();
      if (!this.filledForm.username && !this.filledForm.password) {
        this.showErrors("Please fill in your username and password.");
      } else {
        let response = await this.login({
          email: this.filledForm.username,
          password: this.filledForm.password
        });
        console.log("USER:", response);
        if (response.error) {
          this.showErrors(response.error);
        } else if (response.username) {
          this.$router.push({
            name: "Account"
          });
        } else {
          this.showErrors("Wrong password or username.");
        }
      }
    },
    goToRegister() {
      this.$router.push({
        name: "Registration"
      });
    }, 
    showErrors(errMsg) {
      this.hasErrors = true;
      this.errorMessage = errMsg;
    },
    resetErrors() {
      this.hasErrors = false;
      this.errorMessage = "";
    },
  },
  watch: {
    filledForm() {}
  }
});
</script>


<style scoped>
.login-container {
  padding: 10px;
}

.login-container h2 {
  padding-bottom: 10px;
  padding-top: 30px;
  text-align: center;
}

.form-container {
  text-align: center;
}

.submit-btn {
  padding-top: 10px;
  text-align: center;
}

.register-btn {
  padding-top: 5px;
  text-align: center;
}

.form {
  padding: 5px 0 10px 0;
}

.error-mgs {
  color: #FF4C4B;
}
</style>