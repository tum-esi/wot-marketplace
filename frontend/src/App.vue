<template>
  <div id="app">
    <oHeader />
    <router-view style="min-height: calc(100vh - 125px); overflow: auto"/>
    <oFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import oHeader from "@/components/03_organisms/oHeader.vue";
import oFooter from "@/components/03_organisms/oFooter.vue";

export default Vue.extend({
  name: "app",
  components: {
    oHeader,
    oFooter
  }
});
</script>

<style>
* {
  box-sizing: border-box;
}

html, body, #app {
  min-height: 100vh;
  width: 100%;
  margin: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6em;
  background: #eee;
}

</style>
