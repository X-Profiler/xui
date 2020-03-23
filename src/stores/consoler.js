"use strict";

import * as utils from "../javascripts/lib/utils";

const { state: consolerState, mutations: consolerMutations, handle: handConsoler } =
  utils.storeFactory("new_app", undefined);
const { state: appListState, mutations: appListMutations, handle: handAppList } =
  utils.storeFactory("app_list", []);

export default {
  namespaced: true,

  state: {
    ...consolerState,
    ...appListState,

    newAppModal: undefined
  },

  mutations: {
    ...consolerMutations,
    ...appListMutations,

    setNewAppModal(state, { status }) {
      if (status === false || status === true) {
        state.newAppModal = status;
      }
    }
  },

  actions: {
    async createNewApp(context, { cancelToken, newAppName }) {
      const { rootState } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.app,
        data: { newAppName }
      };

      await handConsoler(context, options);
    },

    async getApps(context, { cancelToken, type }) {
      const { rootState } = context;

      if (!type) {
        return;
      }

      const options = {
        cancelToken,

        // user data
        url: rootState.url.apps,
        data: { type }
      };

      await handAppList(context, options, "list", "array");
    },

    async getOverviewMetrics(context, { cancelToken, appId }) {
      const { rootState, dispatch } = context;

      if (!appId) {
        return {};
      }

      const options = {
        cancelToken,

        // user data
        url: rootState.url.overviewMetrics,
        data: { appId }
      };

      return dispatch("request", options, { root: true });
    },

    async getMainMetrics(context, { cancelToken, urlKey, appId }) {
      const { rootState, dispatch } = context;

      if (!appId) {
        return;
      }

      const options = {
        cancelToken,

        // user data
        url: rootState.url[urlKey],
        data: { appId }
      };

      return dispatch("request", options, { root: true });
    }
  }
};