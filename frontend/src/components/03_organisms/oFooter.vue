<template>
  <div class="footer-container">
    <label class="footer-el">Copyrights © 2019 WoTify. All rights reserved. <a href="/impressum" target="_blank">Impressum</a> </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class oFooter extends Vue{ }
</script>

<style scoped>
.footer-container {
  clear: both;
  background: #1c1c1c;
  padding: 10px;
  overflow: hidden;
  width: 100%;
  height: 50px;
  border-top: 3px solid #30b8a3;
  text-align: center;
}

.footer-el {
  color: #fff;
  font-size: 14px;
}
</style>