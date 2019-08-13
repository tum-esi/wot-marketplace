<template>
  <div id="app">
    <oHeader />
    <router-view />
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

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6em;
  background: #eee;
  min-height: 100%;
  margin: 0 0 50px 0;
}

</style>
