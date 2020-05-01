"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: ruleState, mutations: ruleMutations, handle: handleRules } =
  utils.storeFactory("rules", []);
const { state: contactState, mutations: contactMutations, handle: handleContacts } =
  utils.storeFactory("contacts", { remainMembers: [], contacts: [] });

export default {
  namespaced: true,

  state: {
    ...ruleState,

    ...contactState,

    tipModal: undefined,
    tipData: {},

    contactsModal: undefined,
    contactsData: {},

    editModel: false,
    editData: {}
  },

  mutations: {
    ...ruleMutations,

    ...contactMutations,

    resetState(state) {
      state.tipModal = undefined;
      state.tipData = {};
      state.editModel = false;
      state.editData = {};
    },

    setTipModal(state, { status, data }) {
      if (status === false || status === true) {
        state.tipModal = status;
      }

      if (data) {
        state.tipData = data;
      }
    },

    setContactsModal(state, { status, data }) {
      if (status === false || status === true) {
        state.contactsModal = status;
      }

      if (data) {
        state.contactsData = data;
      }
    },

    setEditModel(state, { status, data }) {
      if (status === false || status === true) {
        state.editModel = status;
      }

      if (data) {
        state.editData = data;
      }
    }
  },

  actions: {
    async getRules(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.strategies,
        data: {
          appId: rootGetters.appId
        }
      };

      await handleRules(context, options, "list", "array");
    },

    async postRule(context, { cancelToken, data }) {
      const { rootState, rootGetters, dispatch } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.strategy,
        data: {
          appId: rootGetters.appId,
          ...data
        }
      };

      await dispatch("request", options, { root: true });
    },

    async putRule(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "PUT",

        // user data
        url: rootState.url.strategy,
        data
      };

      await dispatch("request", options, { root: true });
    },

    async deleteRule(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "DELETE",

        // user data
        url: rootState.url.strategy,
        data
      };

      await dispatch("request", options, { root: true });
    },

    async putRuleStatus(context, { cancelToken, data }) {
      const { rootState, dispatch } = context;

      const options = {
        cancelToken,
        method: "PUT",

        // user data
        url: rootState.url.strategyStatus,
        data
      };

      await dispatch("request", options, { root: true });
    },

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
    }
  }
};