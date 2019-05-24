// import Vue from 'vue';

export default {
    namespaced: true, 
    state: {
        currentProject: {},
        currentProjectList: [
            {

            }
        ]
    }, 
    actions: {

    }, 
    mutations: {
        
    }, 
    getters: {
        getAllProjects: state => state.currentProjectList,
        getCurrentProject: state => state.currentProject
    }
}