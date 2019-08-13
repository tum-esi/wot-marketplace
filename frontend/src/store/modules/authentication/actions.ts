import { ActionTree } from 'vuex';

import { AuthState } from './types';
import { register, login } from '@/api';

export const actions: ActionTree<AuthState, {}> = {
  login({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      let response = await login(payload);
      if(!response.error){
        localStorage.setItem('user-token', response.token);
        localStorage.setItem('user-name', response.username);
  
        commit('setCurrentUser', response.username);
        commit('setToken', response.token);
  
        resolve({
          success: true,
          message: `${response.username} logged in.`
        });
      } else {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-name');
      
        reject({
          success: false,
          message: response.error
        });
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
  },
  async register({ commit }, payload) {
    
  }
}