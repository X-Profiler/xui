"use stritc";

import * as utils from "../javascripts/lib/utils";

const { state: procState, mutations: procMutations, handle: handlePorc } =
  utils.storeFactory("processes", []);
const { state: xprofilerProcState, mutations: xprofilerProcMutations, handle: handleXprofilerProc } =
  utils.storeFactory("xprofiler_processes", []);
const { state: xprofilerStatusState, mutations: xprofilerStatusMutations, handle: handleXprofilerStatus } =
  utils.storeFactory("xprofiler_status", undefined);

export default {
  namespaced: true,

  state: {
    ...procState,
    ...xprofilerProcState,
    ...xprofilerStatusState,

    xprofilerStatusModal: undefined,
    xprofilerCheckPid: undefined,

    processTrendDrawer: undefined,
    processTrendData: {},

    processesDrawer: undefined,

    saveTrendModal: undefined,
    saveTrendData: {},

    colors: [
      "rgb(42, 125, 194)",
      "rgb(106, 90, 205)",
      "rgb(41, 145, 65)",
      "rgb(215, 124, 0)",
      "rgb(186, 74, 0)",
      "rgb(46, 134, 193)",
      "rgb(136, 78, 160)",
      "rgb(19, 141, 117)",
      "rgb(34, 153, 84)"
    ],
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
    },

    setProcessTrendDrawer(state, { status, processData }) {
      if (status === false || status === true) {
        state.processTrendDrawer = status;
      }

      if (processData) {
        state.processTrendData = processData;
      }
    },

    setProcessesDrawer(state, { status }) {
      if (status === false || status === true) {
        state.processesDrawer = status;
      }
    },

    setSavetrendDrawer(state, { status, processData }) {
      if (status === false || status === true) {
        state.saveTrendModal = status;
      }

      if (processData) {
        state.saveTrendData = processData;
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
    },

    async getProcessTrend(context, { cancelToken, trendType }) {
      const { state, getters, dispatch, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.processTrend,
        data: {
          appId: getters.appId,
          agentId: getters.agentId,
          pid: state.processTrendData.pid,
          trendType
        }
      };

      return dispatch("request", options, { root: true });
    },

    async saveProcessTrend(context, { cancelToken }) {
      const { state, getters, dispatch, rootState } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.processTrend,
        data: {
          appId: getters.appId,
          agentId: getters.agentId,
          pid: state.saveTrendData.pid
        }
      };

      return dispatch("request", options, { root: true });
    }
  },
};