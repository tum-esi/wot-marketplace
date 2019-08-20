import Vue from "vue";
import Vuex from "vuex";

import { authentication } from './modules/authentication';
import { library } from './modules/library';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    authentication,
    library
  }
});
