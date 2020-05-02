"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: settingState, mutations: settingMutations, handle: handleSettings } =
  utils.storeFactory("settings", {});

export default {
  namespaced: true,

  state: {
    ...settingState,

    modifyModal: undefined
  },

  mutations: {
    ...settingMutations,

    setModifyModal(state, { status }) {
      if (status === false || status === true) {
        state.modifyModal = status;
      }
    },

    updateSettingsAppName(state, name) {
      state.settings_data.name = name;
    }
  },

  actions: {
    async getSettingsInfo(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.settings,
        data: {
          appId: rootGetters.appId,
        }
      };

      await handleSettings(context, options);
    },

    async putNewAppName(context, { cancelToken, newAppName }) {
      const { rootState, rootGetters, dispatch } = context;

      const options = {
        cancelToken,
        method: "PUT",

        // user data
        url: rootState.url.settingsAppName,
        data: {
          appId: rootGetters.appId,
          newAppName
        }
      };

      await dispatch("request", options, { root: true });
    }
  }
};