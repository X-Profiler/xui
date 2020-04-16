"use strict";

export default {
  namespaced: true,

  state: {
    diagTab: undefined,
    uvType: undefined
  },

  mutations: {
    setDiagTab(state, tab) {
      state.diagTab = tab;
    },

    setUvType(state, type) {
      state.uvType = type;
    }
  }
};