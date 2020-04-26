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

      const list = gcList.map(({ type, before, after, timeFromStart }, idx) => {
        const beforeSpaces = getters.getSpacesMap(before);
        const afterSpaces = getters.getSpacesMap(after);
        if (!spaces) {
          spaces = Object.keys(beforeSpaces);
        }

        const res = {
          type,
          index: idx + 1,
          timeFromStart: timeFromStart * 1000
        };

        let total = 0;
        let totalAbs = 0;
        for (const space of spaces) {
          const tmp = (afterSpaces[space] - beforeSpaces[space]) / 1024 / 1024;
          total += tmp;
          totalAbs += Math.abs(tmp);
          res[space] = Math.abs(tmp);
          res[`${space}_positive`] = tmp > 0;
        }

        res["all_spaces"] = Math.abs(total);
        res["all_spaces_positive"] = total > 0;
        res["all_size_abs"] = totalAbs;

        return res;
      });

      spaces.push("all_spaces");

      spaces = spaces.filter(space => !list.every(item => item[space] === 0));

      spaces = spaces.map(space => {
        let label = space;
        if (label === "new_large_object_space") {
          label = "new_lo_space";
        }
        if (label === "large_object_space") {
          label = "lo_space";
        }
        if (label === "code_large_object_space") {
          label = "code_lo_space";
        }

        return { label, value: space };
      });

      return { spaces, list };
    },

    calculateSize: () => (spaces, type = "space_used_size") => {
      let total = 0;
      for (const space of spaces) {
        total += space[type];
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