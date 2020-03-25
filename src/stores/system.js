"use strict";

import * as utils from "@/javascripts/lib/utils";

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

  actions: {
    async getSystemOverview(context, { cancelToken }) {
      const { rootGetters, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.overview,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId
        }
      };

      await handleOverview(context, options);
    },

    async getSystemTrend(context, { cancelToken, trendType }) {
      const { dispatch, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.systemTrend,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          trendType
        }
      };

      return dispatch("request", options, { root: true });
    }
  }
};