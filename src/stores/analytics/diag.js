"use strict";

export default {
  namespaced: true,

  state: {
    diagTab: undefined
  },

  mutations: {
    setDiagTab(state, tab) {
      state.diagTab = tab;
    }
  }
};