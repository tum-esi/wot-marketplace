import { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { LibraryState } from './types';

export const library: Module<LibraryState, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}