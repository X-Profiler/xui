"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: ruleState, mutations: ruleMutations, handle: handleRules } =
  utils.storeFactory("rules", []);

export default {
  namespaced: true,

  state: {
    ...ruleState,

    tipModal: undefined,
    tipData: {},

    contactsModal: undefined,
    contactsData: {},

    historyDrawer: undefined,
    historyData: {},

    editModel: false,
    editData: {},
  },

  getters: {
    formatContextType: () => contextType => {
      let label = "";
      switch (contextType) {
        case "xprofiler_log":
          label = "X-Profiler 插件日志";
          break;
        case "xtransit_notification":
          label = "X-Transit 通知信息";
          break;
        case "system_log":
          label = "操作系统指标日志";
          break;
        case "error_log":
          label = "Node.js 应用错误日志";
          break;
        default:
          break;
      }

      return label;
    },
  },

  mutations: {
    ...ruleMutations,

    resetState(state) {
      state.tipModal = undefined;
      state.tipData = {};
      state.editModel = false;
      state.editData = {};
    },

    setTipModal(state, { status, data }) {
      if (status === false || status === true) {
        state.tipModal = status;
      }

      if (data) {
        state.tipData = data;
      }
    },

    setContactsModal(state, { status, data }) {
      if (status === false || status === true) {
        state.contactsModal = status;
      }

      if (data) {
        state.contactsData = data;
      }
    },

    setHistoryDrawer(state, { status, historyData }) {
      if (status === false || status === true) {
        state.historyDrawer = status;
      }

      if (historyData) {
        state.historyData = historyData;
      }
    },

    setEditModel(state, { status, data }) {
      if (status === false || status === true) {
        state.editModel = status;
      }

      if (data) {
        state.editData = data;
      }
    }
  },

  actions: {
    async getRules(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.strategies,
        data: {
          appId: rootGetters.appId
        }
      };

      await handleRules(context, options, "list", "array");
    },

    async postRule(context, { cancelToken, data }) {
      const { rootState, rootGetters, dispatch } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.strategy,
        data: {
          appId: rootGetters.appId,
          ...data
        }
      };

      await dispatch("request", options, { root: true });
    },

    async putRule(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "PUT",

        // user data
        url: rootState.url.strategy,
        data
      };

      await dispatch("request", options, { root: true });
    },

    async deleteRule(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "DELETE",

        // user data
        url: rootState.url.strategy,
        data
      };

      await dispatch("request", options, { root: true });
    },

    async putRuleStatus(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "PUT",

        // user data
        url: rootState.url.strategyStatus,
        data
      };

      await dispatch("request", options, { root: true });
    }
  }
};