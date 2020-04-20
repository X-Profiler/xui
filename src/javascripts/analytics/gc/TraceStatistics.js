"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapGetters } = utils.createNamespace("dashboard/analytics/gc");

export default {
  methods: {
    formatPercentage(pect) {
      return pect.toFixed(2);
    }
  },

  computed: {
    ...mapGetters(["startTime", "stopTime", "pauseTime", "memoryChange"]),

    totalPauseTime() {
      let total = 0;
      for (const time of this.pauseTime) {
        total += time;
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