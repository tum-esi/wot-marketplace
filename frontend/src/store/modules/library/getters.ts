import { GetterTree } from 'vuex';
import { LibraryState } from './types';

export const getters: GetterTree<LibraryState, {}> = {
  getPage(state): number {
    return state.page;
  },
  getTotalPages(state): number {
    return state.totalPages;
  },
  getTotalResults(state): number {
    return state.totalResults;
  },
  getTotalDocs(state): number {
    return state.totalDocs;
  },
  getLoadedProjects(state): object[] {
    return state.loadedProjects;
  }
}