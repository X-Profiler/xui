"use strict";

import * as utils from "../javascripts/lib/utils";

const { state: appState, mutations: appMutations, handle: handleApp } = utils.storeFactory("app", []);

export default {
  namespaced: true,

  state: {
    ...appState,

    appId: undefined
  },

  mutations: {
    ...appMutations,

    setAppId(state, appId) {
      state.appId = appId;
    }
  },

  actions: {
    async getAppInfo(context, cancelToken) {
      const { state, rootState } = context;
      const options = {
        cancelToken,

        // user data
        url: rootState.url.appInfo,
        data: {
          appId: state.appId
        }
      };

      await handleApp(context, options);
    }
  }
};