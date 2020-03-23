"use strict";

import * as utils from "../javascripts/lib/utils";

const { state: overviewState, mutations: overviewMutations, handle: handleOverview } =
  utils.storeFactory("overview", {});

export default {
  namespaced: true,

  state: {
    ...overviewState
  },

  mutations: {
    ...overviewMutations
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

  actions: {
    async getSystemOverview(context, { cancelToken }) {
      const { getters, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.overview,
        data: {
          appId: getters.appId,
          agentId: getters.agentId
        }
      };

      await handleOverview(context, options);
    },
  }
};