import { ActionTree } from 'vuex';

import { LibraryState } from './types';
import { searchProjects } from '@/api';

export const actions: ActionTree<LibraryState, {}> = {
  async searchProjects({ commit }, payload){
    return new Promise(async (resolve) => {
      let response = await searchProjects(payload);
      
      commit('setPage', response.page);
      commit('setTotalPages', Math.ceil(response.totalResults/payload.pageSize));
      commit('setTotalResults', response.totalResults);
      commit('setLoadedProjects', response.results);
      commit('setTotalDocs', response.totalDocs);
      
      resolve();
    });
  }
}