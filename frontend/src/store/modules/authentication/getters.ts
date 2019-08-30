import { GetterTree } from 'vuex';
import { AuthState } from './types';

export const getters: GetterTree<AuthState, {}> = {
  getToken(state): string {
    return state.token;
  },
  getUsername(state): string {
    return state.username;
  },
  isConnected(state): boolean {
    return !!state.token;
  }
}