import { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AuthState } from './types';

export const authentication: Module<AuthState, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}