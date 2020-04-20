"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState } = utils.createNamespace("dashboard/analytics");

export default {
  methods: {
    formatPercentage(pect) {
      return pect.toFixed(2);
    },

    calculateSize(spaces) {
      let total = 0;
      for (const space of spaces) {
        total += space.space_used_size;
      }
      return total;
    }
  },

  computed: {
    ...mapState(["file_data"]),

    startTime() {
      const { startTime = 0 } = this.file_data;
      return startTime * 1000;
    },

    stopTime() {
      const { stopTime = 0 } = this.file_data;
      return stopTime * 1000;
    },

    pauseTime() {
      const { gc: gcList } = this.file_data;
      const data = [];
      for (const gc of gcList) {
        data.push(+(gc.end - gc.start));
      }
      return data;
    },

    totalPauseTime() {
      let total = 0;
      for (const time of this.pauseTime) {
        total += time;
      }
      return total;
    },

    memoryChange() {
      const { gc: gcList } = this.file_data;
      return gcList.map(gc => {
        const change = this.calculateSize(gc.after) - this.calculateSize(gc.before);
        return change / 1024 / 1024;
      });
    },

    gcOccupy() {
      const pause = this.totalPauseTime;
      const total = this.stopTime - this.startTime;
      return pause / total * 100;
    }
  }
};