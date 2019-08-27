<template>
  <button class="btn" :class="addClass" @click="onClick" :disabled="isDisabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aButton extends Vue {
  @Prop({ default: null }) btnValue?: any;
  @Prop({ default: false }) isDisabled?: boolean;
  @Prop() btnEvent!: string;
  @Prop() addClass?: string;

  onClick() {
    if (this.btnValue) return this.$emit(this.btnEvent, this.btnValue);
    this.$emit(this.btnEvent);
  }
}
</script>

<style scoped>
.login-form {
  text-align: center;
  outline: none;
  width: 150px;
  height: 35px;
  padding: 5px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  font-size: 15px;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
}

.login-form:hover {
  background: #333;
}

.register-form {
  text-align: center;
  outline: none;
  width: 200px;
  height: 40px;
  padding: 5px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  font-size: 20px;
  border-radius: 7px;
  margin: 10px;
  cursor: pointer;
}

.register-form:hover {
  background: #333;
}

.contribute-form {
  text-align: center;
  outline: none;
  width: 300px;
  height: 50px;
  padding: 5px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  font-size: 20px;
  border-radius: 7px;
  margin: 10px;
  cursor: pointer;
}

.contribute-form:hover {
  background: #333;
}

.dropDown-element {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  font-size: 20px;
  border: none;
  outline: none;
  width: 100%;
  cursor: pointer;
}

.dropDown-element:hover {
  background: #30b8a3;
  color: #fff;
}

.search-btn:hover {
  opacity: 0.8;
}

.password-change-form {
  text-align: center;
  outline: none;
  width: 10vw;
  padding: 0.6vw;
  background: #1c1c1c;
  color: #fff;
  border: none;
  font-size: 0.8vw;
  border-radius: 5px;
  margin: auto;
  cursor: pointer;
}

.password-change:hover {
  opacity: 0.8;
}

.page-navigator {

}

.project-button {
  text-decoration: none;
  font-size: 18px;
  background: maroon;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0 5px;
  cursor: pointer;
}

.project-button:hover {
  opacity: 0.8;
}
</style>