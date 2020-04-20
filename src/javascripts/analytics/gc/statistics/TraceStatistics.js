"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState } = utils.createNamespace("dashboard/analytics");

export default {
  methods: {
    formatPercentage(pect) {
      return pect.toFixed(2);
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

    totalPauseTime() {
      const { gc: gcList } = this.file_data;
      let total = 0;
      for (const gc of gcList) {
        total += +(gc.end - gc.start);
      }
      return total;
    },

    gcOccupy() {
      const pause = this.totalPauseTime;
      const total = this.stopTime - this.startTime;
      return pause / total * 100;
    }
  }
};