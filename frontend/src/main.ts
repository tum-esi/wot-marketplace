import Vue from "vue";
import VueMatomo from 'vue-matomo'
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/store";

Vue.config.productionTip = false;

Vue.use(VueMatomo, {
  host: 'https://matomo.wotify.org',
  siteId: 1,
  router: router,
  enableHeartBeatTimer: true,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
