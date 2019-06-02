import * as Api from '@/api/Api';

export default {
    namespaced: true,
    state: {
        currentProjectItems: [],
        currentProject: {},
        newProject: {},
        cachedProjects: []
    },
    actions: {
        async addNewProject({ commit }, payload) {
            await Api.addNewProject(payload.newProject);
            commit('setNewProject', payload.newProject);
        },
        async loadProjectItems({ commit }, payload) {
            let newProjectItems = await Api.getProjects(payload.searchTerm, payload.searchOptions);
            commit('addLoadedProjectItems', newProjectItems);
            return newProjectItems;
        },
        async loadProject({ commit }, payload) {
            let response = await Api.loadProject(payload.projectId);
            commit('setCurrentProject', response.data[0]);
            return response.data[0];
        },
    },
    mutations: {
        addLoadedProjectItems(state, payload) {
            state.currentProjectItems = payload;
        },
        setCurrentProject(state, payload) {
            state.currentProject = payload;
        },
        setNewProject(state, payload) {
            state.newProject = payload;
        }
    },
    getters: {
        getCurrentProject: state => { return state.currentProject; },
        getCurrentProjectItems: state => { return state.currentProjectItems; },
        getNewProject: state => { return state.newProject; },
        getCachedProjects: state => { return state.cachedProjects; },
    }
}

// Dummy project 

// return [{complexity: "sdf<s",
// github: "sdf<s",
// implementationType: "sdf<s",
// longDescription: "sdf<s",
// name: "sdf<s",
// platform: "sdf<s",
// shortDescription: "sdf<s",
// tags: "sdf<s",
// td: "sdf<s",
// topic: "sdf,<s",
// _id: "sdf<s"}]