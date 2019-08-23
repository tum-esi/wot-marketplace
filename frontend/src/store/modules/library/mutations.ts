import { MutationTree } from 'vuex';
import { LibraryState } from './types';

export const mutations: MutationTree<LibraryState> = {
  setPage(state, payload){
    state.page = payload;
  },
  setTotalPages(state, payload){
    state.totalPages = payload;
  },  
  setTotalResults(state, payload){
    state.totalResults = payload;
  },
  setTotalDocs(state, payload){
    state.totalDocs = payload;
  },
  setLoadedProjects(state, payload){
    state.loadedProjects = payload;
  }
}