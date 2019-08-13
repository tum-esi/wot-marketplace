<template>
  <router-link :to="to" :tag="tag" :activeClass="activeClass" :class="addClass" exact>
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aNavLink extends Vue {
  @Prop() private to!: object;
  @Prop() private tag?: string;
  @Prop({ default: "" }) private activeClass!: string;
  @Prop({ default: "" }) private addClass!: string;
}
</script>

<style scoped>
.default:link {
  color: #30b8a3;
  opacity: 0.8;
  margin: 5px;
}

.default:hover {
  opacity: 1;
}

.default:visited {
  color: #30b8a3;
}

.header-element {
  vertical-align: top;
  width: 150px;
  height: 50px;
  padding: 10px;
  background: #1c1c1c;
  color: #fff;
  border: none;
  border-radius: 3px;
  text-decoration: none;
  text-align: center;
  outline: none;
  font-size: 20px;
}

.header-element:hover {
  background: #333;
}

.dropDown-element {
  color: black;
  padding: 12px 16px;
  display: block;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  outline: none;
}

.dropDown-element:hover {
  background: #30b8a3;
  color: #fff;
}
</style>