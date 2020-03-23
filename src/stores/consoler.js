"use strict";

import * as utils from "../javascripts/lib/utils";

const { state: consolerState, mutations: consolerMutations, handle: handConsoler } =
  utils.storeFactory("new_app", undefined);

export default {
  namespaced: true,

  state: {
    ...consolerState,

    newAppModal: undefined
  },

  mutations: {
    ...consolerMutations,

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
    }
  }
};