"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: contactState, mutations: contactMutations, handle: handleContacts } =
  utils.storeFactory("contacts", { remainMembers: [], contacts: [] });

export default {
  namespaced: true,

  state: {
    ...contactState,
  },

  mutations: {
    ...contactMutations,
  },

  actions: {
    async getContacts(context, { cancelToken, strategyId }) {
      const { rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.strategyContacts,
        data: { strategyId }
      };

      await handleContacts(context, options);
    },

    async removeContact(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "DELETE",

        // user data
        url: rootState.url.strategyContact,
        data
      };

      await dispatch("request", options, { root: true });
    },

    async addContact(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.strategyContact,
        data
      };

      await dispatch("request", options, { root: true });
    },
  }
};