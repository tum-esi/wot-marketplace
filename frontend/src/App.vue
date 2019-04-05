<template>
  <div id="app">
    <Header v-on:nav-clicked="navItemClicked"/>
    <SearchContainer/>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import SearchContainer from "./components/Content/Search/SearchContainer";
import Footer from './components/Footer/Footer.vue';

export default {
  name: "app",
  components: {
    Header,
    SearchContainer,
    Footer
  },
  methods: {
    navItemClicked(navItem) {
      console.log(`${navItem} clicked`);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
}

.btn {
  color: #ffffff;
  background: #000000;
  display: inline-block;
  border: none;
  cursor: pointer;
  padding: 20px;
  border-radius: 15%;
}

.btn:hover {
  background: rgb(100, 93, 93);
}
</style>
