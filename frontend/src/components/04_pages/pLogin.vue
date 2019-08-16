<template>
  <div class="login-content">
    <h1 class="login-header">Login to WoTify</h1>
    <hr />
    <oForm
      :formFields="loginFormFields"
      buttonLabel="Login"
      :enterToSubmit="true"
      :submitFunction="attemptLogin"
      addClass="login-form"
    />
    <aNavLink :to="{ name: 'Register' }" :addClass="'default'">Don't have an account? Sign-up here.</aNavLink>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import aNavLink from "@/components/01_atoms/aNavLink.vue";
import oForm from "@/components/03_organisms/oForm.vue";

const authModule = namespace("authentication");

@Component({
  components: {
    oForm,
    aNavLink
  }
})
export default class pLogin extends Vue {
  @authModule.Action("login") login!: (
    userCredentials: Object
  ) => { success: boolean; message: string };

  private loginFormFields = [
    {
      type: "text",
      label: "Username",
      placeholder: "Enter your username here",
      variable: "username"
    },
    {
      type: "password",
      label: "Password",
      placeholder: "Enter your password here",
      variable: "password"
    }
  ];

  async attemptLogin(loginFormData: Object) {
    let authenticated = await this.login(loginFormData);
    if (authenticated.success) {
      this.$router.push({
        name: "Library"
      });
    }
  }
}
</script>

<style scoped>
hr {
  width: 350px;
  height: 1px;
}

.login-header {
  font-weight: 200;
}

.login-content {
  text-align: center;
  padding: 12%;
}
</style>