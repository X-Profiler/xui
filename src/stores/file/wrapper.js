"use strict";

export default {
  namespaced: true,

  state: {
    diagDrawer: undefined,
    diagData: {},

    gcDrawer: undefined,
    gcData: {}
  },

  mutations: {
    setDiagDrawer(state, { status, diagData }) {
      if (status === false || status === true) {
        state.diagDrawer = status;
      }

      if (diagData) {
        state.diagData = diagData;
      }
    },

    setGcDrawer(state, { status, gcData }) {
      if (status === false || status === true) {
        state.gcDrawer = status;
      }

      if (gcData) {
        state.gcData = gcData;
      }
    }
  }
};