"use strict";

export default {
  namespaced: true,

  state: {
    appId: undefined
  },

  mutations: {
    setAppId(state, appId) {
      state.appId = appId;
    }
  }
};