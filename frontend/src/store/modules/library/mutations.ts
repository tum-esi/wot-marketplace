import { MutationTree } from 'vuex';
import { LibraryState } from './types';

export const mutations: MutationTree<LibraryState> = {
  setCurrentPage(state, payload){
    state.page = payload;
  },
  setLoadedProjects(state, payload){
    state.loadedProjects = payload;
  },
  setTotalProjects(state, payload){
    state.totalProjects = payload;
  }
}