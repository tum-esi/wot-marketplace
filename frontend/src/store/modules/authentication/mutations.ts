import { MutationTree } from 'vuex';
import { AuthState } from './types';

export const mutations: MutationTree<AuthState> = {
  setCurrentUser(state, payload){
    state.username = payload;
  },
  setToken(state, payload){
    state.token = payload;
  },
  removeToken(state){
    state.token = '';
  },
  removeCurrentUser(state){
    state.username = '';
  }
}