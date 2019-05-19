import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


      // this.projects = [];
      // fetch(
      //   `../../api/search?q=${encodeURIComponent(
      //     this.searchTerm
      //   )}&count=10`
      // )
      //   .then(res => res.json())
      //   .then(json => {
      //     this.loading = false;
      //     this.status = "";
      //     this.projects = json.results;
      //     if (this.projects.length === 0) {
      //       this.status = "noResult";

      // this.projects = [];
      // fetch(
      //   `api/search?q=${encodeURIComponent(
      //     this.searchTerm
      //   )}&count=10`
      // )
      //   .then(res => res.json())
      //   .then(json => {
      //     this.loading = false;
      //     this.status = "";
      //     this.projects = json.results;
      //     if (this.projects.length === 0) {
      //       this.status = "noResult";
      //     }
      //     console.log("results", json.results);
      //   })
      //   .catch(err => {
      //     this.status = "error";
      //     this.error = err;
      //   });