"use stritc";

export default {
  namespaced: true,

  state: {
    processesLoading: false,
    processesLoadError: undefined,
    processes: []
  },

  getters: {
    appId(...args) {
      const rootState = args[2];
      return rootState.dashboard.appId;
    },

    agentId(...args) {
      const rootState = args[2];
      return rootState.dashboard.instance.agentId;
    }
  },

  mutations: {
    setProcessLoadingStatus(state, status) {
      state.processesLoading = status;
    },

    updateProcessLoadError(state, err) {
      state.processesLoadError = err;
    },

    setProcesses(state, processes) {
      state.processes = processes;
    }
  },

  actions: {
    async getNodeProcesses({ dispatch, commit, getters, rootState }, cancelToken) {
      commit("setProcessLoadingStatus", true);
      const options = {
        disableGlobalError: true,
        cancelToken,

        // user data
        url: rootState.url.agentNodeProcesses,
        data: {
          appId: getters.appId,
          agentId: getters.agentId
        }
      };

      try {
        commit("updateProcessLoadError", undefined);
        const { list } = await dispatch("request", options, { root: true });
        if (Array.isArray(list)) {
          commit("setProcesses", list);
        }
      } catch (err) {
        commit("updateProcessLoadError", err.message);
      }
      commit("setProcessLoadingStatus", false);
    }
  }
};