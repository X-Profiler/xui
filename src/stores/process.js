"use stritc";

import * as utils from "../javascripts/lib/utils";

const { state: procState, mutations: procMutations, handle: handlePorc } = utils.storeFactory("processes", []);
const { state: xprofilerProcState, mutations: xprofilerProcMutations, handle: handleXprofilerProc } = utils.storeFactory("xprofiler_processes", []);
const { state: xprofilerStatusState, mutations: xprofilerStatusMutations, handle: handleXprofilerStatus } = utils.storeFactory("xprofiler_status", undefined);

export default {
  namespaced: true,

  state: {
    ...procState,
    ...xprofilerProcState,
    ...xprofilerStatusState,

    xprofilerStatusModal: undefined,
    xprofilerCheckPid: undefined
  },

  mutations: {
    ...procMutations,
    ...xprofilerProcMutations,
    ...xprofilerStatusMutations,

    setXprofilerStatusModal(state, { status, pid }) {
      if (status === false || status === true) {
        state.xprofilerStatusModal = status;
      }

      if (pid && !isNaN(pid)) {
        state.xprofilerCheckPid = pid;
      }
    }
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
    },

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

    async getXprofilerStatus(context, { cancelToken, pid }) {
      const { getters, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.xprofilerStatus,
        data: {
          appId: getters.appId,
          agentId: getters.agentId,
          pid
        }
      };

      await handleXprofilerStatus(context, options);
    }
  }
};