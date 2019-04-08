<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from './components/Footer/Footer.vue';

export default {
  name: "app",
  components: {
    Header,
    Footer
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

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6em;;
}

a {
  text-decoration: none;
}

.bg {
  background: rgb(238, 238, 238);
}

.btn {
  color: #ffffff;
  background: #000;
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
  background: #00b4cc;
  border-color: #00b4cc;
  border-radius: 3px;
  border: none;
}

.invisible {
  display: none;
}
</style>
