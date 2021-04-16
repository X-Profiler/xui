"use strict";

export default {
  namespaced: true,

  state: {
    snapshotTab: undefined
  },

  mutations: {
    setSnapshotTab(state, tab) {
      state.diagTab = tab;
    },
  }
};