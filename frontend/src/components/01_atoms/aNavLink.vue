<template>
  <router-link :to="to" :tag="tag" :active-class="activeClass" :class="addClass">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aNavLink extends Vue {
  @Prop() private to!: object;
  @Prop() private tag?: string;
  @Prop() private activeClass?: string;
  @Prop() private addClass?: string;
}
</script>

<style scoped>
.default:link {
  text-align: center;
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

.project-tag {
  text-decoration: none;
  color: black;
  border-radius: 5px;
  background: white;
  height: 100%;
}

.project-tag:hover {
  opacity: 0.8;
}

.project-tag.code {
  border: 3px solid #116b5e;
}

.project-tag.td {
  border: 3px solid #b85730;
}
</style>