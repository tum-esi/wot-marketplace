<template>
  <div id="app">
    <mHeader/>
    <router-view/>
    <mFooter/>
  </div>
</template>

<script>
import mFooter from "./components/02_molecules/mFooter.vue";
import mHeader from "./components/02_molecules/mHeader.vue";

export default {
  name: "app",
  components: {
    mFooter,
    mHeader
  }
};
</script>

<style>
/* General styling for the whole application, can be used in any component  */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  position: relative;
  min-height: 100%;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6em;
  background: #eee;
  min-height: 100%;
  margin: 0 0 50px 0;
}

a {
  text-decoration: none;
}

.bg {
  background: rgb(238, 238, 238);
}

.btn {
  color: #ffffff;
  background: #1c1c1c;
  display: inline-block;
  border-color: #000;
  cursor: pointer;
  border-radius: 3px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  text-shadow: none;
  outline: none;
  border: none;
}

.btn:hover {
  background: rgb(100, 93, 93);
  border-color: rgb(100, 93, 93);
}

.btn:active {
  background: #30b8a3;
  border-color: #30b8a3;
  border-radius: 3px;
  border: none;
}

.invisible {
  display: none;
}
</style>
