"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: ruleState, mutations: ruleMutations, handle: handleRules } =
  utils.storeFactory("rules", []);

export default {
  namespaced: true,

  state: {
    ...ruleState
  },

  mutations: {
    ...ruleMutations
  },

  actions: {
    async getRules(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.rules,
        data: {
          appId: rootGetters.appId
        }
      };

      await handleRules(context, options);
    }
  }
};