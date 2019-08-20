import { ActionTree } from 'vuex';

import { LibraryState } from './types';
import { searchProjects } from '@/api';

export const actions: ActionTree<LibraryState, {}> = {
  async searchProjects({ commit }, payload){
    return new Promise(async (resolve) => {
      let response = await searchProjects(payload);
      
      commit('setCurrentPage', response.page);
      commit('setLoadedProjects', response.results);
      commit('setTotalProjects', response.totalDocs);

      resolve();
    });
  }
}