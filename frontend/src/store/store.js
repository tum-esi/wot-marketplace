import Vue from 'vue';
import Vuex from 'vuex';
import formNewProject from './modules/formNewProject';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        formNewProject
    },
    state: {
    },
    getters: {
        getTest: state => {
            return state.bla;
        }
    }
})