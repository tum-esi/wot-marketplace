import * as Api from '@/api/Api';

export default {
    namespaced: true, 
    state: {
        currentUser: {},
        newUser: {},
        isUserLoggedIn: true
    }, 
    actions: {
        async register({ commit }, payload) {
            if (payload.newUser) {
                commit('setNewUser', payload.newUser);
            } else {
                return;
            }
            let newUser = await Api.register({newUser: payload.newUser});
            if (newUser) {
                commit('setCurrentUser', newUser);
            } else {
                return "error";
            }
        },
        async login({ commit }, payload) {
            let user = await Api.login({ email: payload.email, password: payload.password});
            if (user) { 
                commit('setCurrentUser', user);
                return user;
            } else {
                return "error";
            }
        }
    }, 
    mutations: {
        setCurrentUser(state, payload) {
            state.currentUser = payload;
        },
        setNewUser(state, payload) {
            state.newUser = payload;
        },
        setUserLoggedIn(state, payload) {
            state.isUserLoggedIn = payload;
        }
    }, 
    getters: {
        getCurrenUser: state => { return state.currentUser; },
        getUserLoggedIn: state => { return state.isUserLoggedIn; },
        getNewUser: state => { return state.newUser; }
    }
}