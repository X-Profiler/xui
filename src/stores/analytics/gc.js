"use strict";

export default {
  namespaced: true,

  state: {
    gcFile: undefined
  },

  mutations: {
    setGcFileData(state, data) {
      state.gcFile = data;
    }
  },

  getters: {
    startTime(state) {
      const { startTime = 0 } = state.gcFile;
      return startTime * 1000;
    },

    stopTime(state) {
      const { stopTime = 0 } = state.gcFile;
      return stopTime * 1000;
    },

    gcList(state) {
      const { gc } = state.gcFile;
      if (Array.isArray(gc)) {
        return gc;
      }
      return [];
    },

    pauseTime(state) {
      const { gc: gcList } = state.gcFile;
      const data = [];
      for (const gc of gcList) {
        data.push(+(gc.end - gc.start));
      }
      return data;
    },

    pauseTimeWithStart(state) {
      const { gc: gcList } = state.gcFile;
      const data = [];
      for (const gc of gcList) {
        data.push({
          pause: +(gc.end - gc.start),
          timeFromStart: gc.timeFromStart * 1000,
          type: gc.type
        });
      }
      return data;
    },

    memoryChange(state, getters) {
      const { gc: gcList } = state.gcFile;
      return gcList.map(gc => {
        const change = getters.calculateSize(gc.after) - getters.calculateSize(gc.before);
        return change / 1024 / 1024;
      });
    },

    calculateSize: () => spaces => {
      let total = 0;
      for (const space of spaces) {
        total += space.space_used_size;
      }
      return total;
    }
  }
};