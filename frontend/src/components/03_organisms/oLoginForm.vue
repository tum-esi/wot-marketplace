<template>
  <div class="login-container">
    <h1 class="login-header">Login to WoTify</h1>
    <hr />
    <mFormElement
      v-model="usernameField"
      labelContent="Username"
      inputType="text"
      inputPlaceholder="Enter your username here"
      class="login-form"
    />
    <mFormElement
      v-model="passwordField"
      labelContent="Password"
      inputType="password"
      inputPlaceholder="Enter your password here"
      class="login-form"
    />
    <aButton
      :addClass="'login-btn'"
      :btnEvent="'login-btn-clicked'"
      @login-btn-clicked="attemptLogin"
    >Login</aButton>
    <aNavLink :to="{ name: 'Register' }" :addClass="'default'">Don't have an account? Sign-up here.</aNavLink>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import mFormElement from "@/components/02_molecules/mFormElement.vue";
import aButton from "@/components/01_atoms/aButton.vue";
import aNavLink from "@/components/01_atoms/aNavLink.vue";

const authModule = namespace("authentication");

@Component({
  components: {
    mFormElement,
    aNavLink,
    aButton
  }
})
export default class oLoginForm extends Vue {
  private usernameField: string;
  private passwordField: string;

  @authModule.Action("login") login!: (userCredentials: Object) => { success: boolean; message: string };
  @authModule.Getter("getToken") getToken!: string;

  async attemptLogin() {
    let authenticated = await this.login({
      username: this.usernameField,
      password: this.passwordField
    });
    if (authenticated.success) {
      this.$router.push({
        name: "Library"
      });
    }
    console.log(authenticated.message);
  }

  constructor() {
    super();
    this.usernameField = "";
    this.passwordField = "";
  }
}
</script>

<style scoped>
hr {
  width: 350px;
}

.login-container {
  display: grid;
  justify-items: center;
}

.login-header {
}

.login-form {
  font-size: 1.3em;
}
</style>