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

    pauseTimeWithStart(state, getters) {
      const { gc: gcList } = state.gcFile;
      const data = [];
      for (let idx = 0; idx < gcList.length; idx++) {
        const gc = gcList[idx];
        const change =
          Number(((getters.calculateSize(gc.after) - getters.calculateSize(gc.before)) / 1024 / 1024).toFixed(2));
        data.push({
          pause: +(gc.end - gc.start),
          timeFromStart: gc.timeFromStart * 1000,
          type: gc.type,
          change,
          changeLabel: change >= 0 ? `+${change}` : `-${Math.abs(change)}`,
          changeAbs: Math.abs(change),
          positive: change > 0,
          index: idx + 1
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

    heapTrendWithStart(state, getters) {
      const { gc: gcList } = state.gcFile;
      return gcList.map((gc, idx) => {
        return {
          timeFromStart: gc.timeFromStart * 1000,
          heap_size: Number((getters.calculateSize(gc.after) / 1024 / 1024).toFixed(2)),
          type: gc.type,
          index: idx + 1
        };
      });
    },

    spaceTrendWithStart(state, getters) {
      const { gc: gcList } = state.gcFile;
      let spaces;

      const list = gcList.map(({ before, after }, idx) => {
        const beforeSpaces = getters.getSpacesMap(before);
        const afterSpaces = getters.getSpacesMap(after);
        if (!spaces) {
          spaces = Object.keys(beforeSpaces);
        }

        const res = {
          index: idx + 1
        };

        let total = 0;
        for (const space of spaces) {
          const tmp = (afterSpaces[space] - beforeSpaces[space]) / 1024 / 1024;
          total += tmp;
          res[space] = Math.abs(tmp);
          res[`${space}_positive`] = tmp > 0;
        }

        res["all_spaces"] = total;
        res["all_spaces_positive"] = total > 0;

        return res;
      });

      spaces.push("all_spaces");

      return { spaces, list };
    },

    calculateSize: () => spaces => {
      let total = 0;
      for (const space of spaces) {
        total += space.space_used_size;
      }
      return total;
    },

    getSpacesMap: () => spaces => {
      const map = {};
      for (const { name, space_used_size } of spaces) {
        map[name] = space_used_size;
      }
      return map;
    }
  }
};