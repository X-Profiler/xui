"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: memberState, mutations: memberMutations, handle: handleMembers } =
  utils.storeFactory("members", []);

export default {
  namespaced: true,

  state: {
    ...memberState,

    confirmModal: undefined,
    confirmData: {}
  },

  getters: {
    createConfirmData: () => (type, title, content, data) => {
      return {
        type, title, content,
        success: false,
        loading: false,
        error: undefined,
        data
      };
    }
  },

  mutations: {
    ...memberMutations,

    setConfirmModal(state, { status, data }) {
      if (status === false || status === true) {
        state.confirmModal = status;
      }

      if (data) {
        state.confirmData = data;
      }
    }
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
    },

    async commonAction(context, options) {
      const { dispatch, commit, state } = context;

      state.confirmData.loading = true;
      try {
        await dispatch("request", options, { root: true });
        state.confirmData.success = true;
        commit("setConfirmModal", { status: false });
      } catch (err) {
        state.confirmData.error = err.message;
      }
      state.confirmData.loading = false;
    },

    async inviteMember(context, { cancelToken, userId, status }) {
      const { rootState, rootGetters, dispatch } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: rootState.url.member,
        data: {
          appId: rootGetters.appId,
          userId,
          status
        }
      };

      await dispatch("commonAction", options);
    },

    async deleteMember(context, { cancelToken, userId }) {
      const { rootState, rootGetters, dispatch } = context;

      const options = {
        cancelToken,
        method: "DELETE",

        // user data
        url: rootState.url.member,
        data: {
          appId: rootGetters.appId,
          userId
        }
      };

      await dispatch("commonAction", options);
    }
  }
};