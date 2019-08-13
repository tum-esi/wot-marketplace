<template>
  <div class="login-form-container">
    <oLoginForm />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import oLoginForm from "@/components/03_organisms/oLoginForm.vue";

@Component({
  components: {
    oLoginForm
  }
})
export default class pLogin extends Vue {}
</script>

<style scoped>
.login-form-container {
  padding: 10%;
}
</style>