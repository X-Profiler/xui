"use strict";

export default {
  namespaced: true,

  state: {
    diagDrawer: undefined,
    diagData: {},

    gcDrawer: undefined,
    gcData: {},

    trendDrawer: undefined,
    trendData: {},

    flamegraphDrawer: undefined,
    flamegraphData: {},
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
    },

    setTrendDrawer(state, { status, trendData }) {
      if (status === false || status === true) {
        state.trendDrawer = status;
      }

      if (trendData) {
        state.trendData = trendData;
      }
    },

    setFlamegraphDrawer(state, { status, flamegraphData }) {
      if (status === false || status === true) {
        state.flamegraphDrawer = status;
      }

      if (flamegraphData) {
        state.flamegraphData = flamegraphData;
      }
    }
  }
};