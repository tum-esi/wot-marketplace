<template>
  <router-link :to="to" :tag="tag" :activeClass="activeClass" :class="addClass" exact>
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aNavLink extends Vue{
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
</style>