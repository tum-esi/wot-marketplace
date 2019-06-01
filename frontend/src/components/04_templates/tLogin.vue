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
    submitForm() {
      var userData = {
        username: "",
        password: ""
      };
      userData.username = this.formElements[0].formValue;

      // console.log("submitttted: ",userData);
    },
    goToRegister() {
      this.$router.push({
        name: "Registration"
      });
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
</style>