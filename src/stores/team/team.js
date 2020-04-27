"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: memberState, mutations: memberMutations, handle: handleMembers } =
  utils.storeFactory("members", []);

export default {
  namespaced: true,

  state: {
    ...memberState
  },

  mutations: {
    ...memberMutations
  },

  actions: {
    async getTeamMembers(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.members,
        data: {
          appId: rootGetters.appId
        }
      };

      await handleMembers(context, options);
    }
  }
};