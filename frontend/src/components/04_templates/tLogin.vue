<template>
  <div class="login-container">
    <h2>Login to WoTify</h2>
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
    <span
      :class="{ 'invisible' : !hasErrors }"
      class="error-mgs"
    >Username or password not correct.</span>
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
      if (this.filledForm.username && this.filledForm.password) {
        console.log("Login: form ok:", this.filledForm);
        let user = await this.login({
          email: this.filledForm.username,
          password: this.filledForm.password
        });
        this.$router.push({
          name: "Account"
        });
      } else {
        this.hasErrors = true;
        console.log("Login: form not ok:", this.filledForm);
        //TODO: fill form
      }
    },
    goToRegister() {
      this.$router.push({
        name: "Registration"
      });
    }
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
.submit-btn {
  padding-top: 5px;
  text-align: center;
}

.register-btn {
  padding-top: 3px;
  text-align: center;
}

.form {
  text-align: center;
  padding-top: 1px;
  padding-bottom: 3px;
}

.error-mgs {
  color: red;
}

.invisible {
  display: none;
}
</style>