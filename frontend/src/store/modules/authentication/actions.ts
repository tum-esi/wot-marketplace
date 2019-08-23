import { ActionTree } from 'vuex';

import { AuthState } from './types';
import { login } from '@/api';

export const actions: ActionTree<AuthState, {}> = {
  login({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      let response = await login(payload);
      if(response.status === 200){
        localStorage.setItem('user-token', response.data.token);
        localStorage.setItem('user-name', response.data.username);
  
        commit('setCurrentUser', response.data.username);
        commit('setToken', response.data.token);
        
        resolve(response);
      } else {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-name');
      
        reject(response);
      }
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("removeToken");
      commit("removeCurrentUser");
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-name");
      resolve();
    });
  }
}