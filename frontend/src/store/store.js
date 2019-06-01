import Vue from 'vue';
import Vuex from 'vuex';
import formNewProject from './modules/formNewProject';
import project from './modules/project';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        formNewProject,
        project, 
        user
    },
    state: {
    },
    getters: {
    }
})