"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: historyState, mutations: historyMutations, handle: handleHistory } =
  utils.storeFactory("history", { count: 0, list: [] });

export default {
  namespaced: true,

  state: {
    ...historyState,
  },

  mutations: {
    ...historyMutations,
  },

  actions: {
    async getAlarmHistory(context, { cancelToken, data }) {
      const { rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.strategyHistory,
        data
      };

      await handleHistory(context, options);
    }
  }
};