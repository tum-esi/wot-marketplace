<template>
  <div class="login-container">
    <h2>Login to WoTify</h2>
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

export default Vue.extend({
  name: "tLogin",
  components: {
    aButton
  },
  props:{
    // formBtnLabel: {
    //   type: String,
    //   required: true
    // },
    filledForm: {}
  },
  data(){
    return{
      formBtnLabel: "Login"
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
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
  text-align: center;
  /* padding-left: 5%; */
  /* margin-left: auto;
  margin-right: auto;
  width: 40%; */
}
.submit-text {
  margin-left: auto;
  margin-right: auto;
  padding-top: 1px;
  padding-bottom: 3px;
  width: 15%; 
}
</style>