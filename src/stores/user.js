"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: userState, mutations: userMutations, handle: handleUser } =
  utils.storeFactory("user", {});


export default {
  namespaced: true,

  state: {
    ...userState
  },

  mutations: {
    ...userMutations
  },

  actions: {
    async getUserInfo(context, { cancelToken }) {
      const { rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.user
      };

      await handleUser(context, options);
    }
  }
};