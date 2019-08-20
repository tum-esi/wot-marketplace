import { GetterTree } from 'vuex';
import { LibraryState } from './types';

export const getters: GetterTree<LibraryState, {}> = {
  getCurrentPage(state): number {
    return state.page;
  },
  getLoadedProjects(state): object[] {
    return state.loadedProjects;
  },
  getTotalProjects(state): number {
    return state.totalProjects;
  }
}