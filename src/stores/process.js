"use stritc";

import * as utils from "@/javascripts/lib/utils";

const { state: procState, mutations: procMutations, handle: handlePorc } =
  utils.storeFactory("processes", []);
const { state: xprofilerProcState, mutations: xprofilerProcMutations, handle: handleXprofilerProc } =
  utils.storeFactory("xprofiler_processes", []);
const { state: xprofilerStatusState, mutations: xprofilerStatusMutations, handle: handleXprofilerStatus } =
  utils.storeFactory("xprofiler_status", undefined);
const { state: saveTrendState, mutations: saveTrendMutations, handle: handleSaveTrend } =
  utils.storeFactory("save_trend", undefined);
const { state: takeActionState, mutations: takeActionMutations, handle: handleTakeAction } =
  utils.storeFactory("take_action", undefined);

export default {
  namespaced: true,

  state: {
    ...procState,
    ...xprofilerProcState,
    ...xprofilerStatusState,
    ...saveTrendState,
    ...takeActionState,

    xprofilerStatusModal: undefined,
    xprofilerCheckPid: undefined,

    processTrendDrawer: undefined,
    processTrendData: {},

    processesDrawer: undefined,

    saveTrendModal: undefined,
    saveTrendData: {},

    takeActionModal: undefined,
    takeActionData: {},

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
    ...saveTrendMutations,
    ...takeActionMutations,

    setXprofilerStatusModal(state, { status, pid }) {
      if (status === false || status === true) {
        state.xprofilerStatusModal = status;
      }

      if (utils.isNumber(pid)) {
        state.xprofilerCheckPid = pid;
      }
    },

    setSaveTrendModal(state, { status, processData }) {
      if (status === false || status === true) {
        state.saveTrendModal = status;
      }

      if (processData) {
        state.saveTrendData = processData;
      }
    },

    setTakeActionModal(state, { status, actionData }) {
      if (status === false || status === true) {
        state.takeActionModal = status;
      }

      if (actionData) {
        state.takeActionData = actionData;
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
    }
  },

  getters: {
    processCount(state) {
      return state.processes_data.length;
    }
  },

  actions: {
    async getNodeProcesses(context, cancelToken) {
      const { getters, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.agentNodeProcesses,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId
        }
      };

      await handlePorc(context, options, "list", "array");
    },

    async getXprofilerProcesses(context, cancelToken) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.agentXprofilerProcesses,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId
        }
      };

      await handleXprofilerProc(context, options, "list", "array");
    },

    async getXprofilerStatus(context, { cancelToken, pid }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.xprofilerStatus,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          pid
        }
      };

      await handleXprofilerStatus(context, options);
    },

    async getProcessTrend(context, { cancelToken, trendType }) {
      const { state, dispatch, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.processTrend,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          pid: state.processTrendData.pid,
          trendType
        }
      };

      return dispatch("request", options, { root: true });
    },

    async saveProcessTrend(context, { cancelToken }) {
      const { state, rootState, rootGetters } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.processTrend,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          pid: state.saveTrendData.pid
        }
      };

      await handleSaveTrend(context, options, "file");
    },

    async takeAction(context, { cancelToken }) {
      const { state, rootState, rootGetters } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.action,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          pid: state.takeActionData.pid,
          action: state.takeActionData.action
        }
      };

      await handleTakeAction(context, options, "file");
    }
  },
};