<template>
  <div class="footer-container">
    <label class="footer-el">Copyrights © 2019 WoTify. All rights reserved.</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class oFooter extends Vue{ }
</script>

<style scoped>
.footer-container {
  background: #1c1c1c;
  padding: 10px;
  overflow: hidden;
  width: 100%;
  border-top: 3px solid #30b8a3;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
}

.footer-el {
  color: #fff;
  font-size: 14px;
}
</style>