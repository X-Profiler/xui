"use stritc";

import * as utils from "../javascripts/lib/utils";

const { state: xprofilerProcState, mutations: xprofilerProcMutations, handle: handleXprofilerProc } = utils.storeFactory("xprofiler_processes", []);
const { state: procState, mutations: procMutations, handle: handlePorc } = utils.storeFactory("processes", []);

export default {
  namespaced: true,

  state: {
    ...procState,
    ...xprofilerProcState
  },

  mutations: {
    ...procMutations,
    ...xprofilerProcMutations
  },

  getters: {
    appId(...args) {
      const rootState = args[2];
      return rootState.dashboard.appId;
    },

    agentId(...args) {
      const rootState = args[2];
      return rootState.dashboard.instance.agentId;
    },

    processCount(state) {
      return state.processes_data.length;
    }
  },

  actions: {
    async getXprofilerProcesses(context, cancelToken) {
      const { getters, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.agentXprofilerProcesses,
        data: {
          appId: getters.appId,
          agentId: getters.agentId
        }
      };

      await handleXprofilerProc(context, options, "list", "array");
    },

    async getNodeProcesses(context, cancelToken) {
      const { getters, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.agentNodeProcesses,
        data: {
          appId: getters.appId,
          agentId: getters.agentId
        }
      };

      await handlePorc(context, options, "list", "array");
    }
  }
};