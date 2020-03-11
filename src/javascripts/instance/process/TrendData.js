"use strict";

import * as utils from "../../lib/utils";

const { mapState, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getProcessTrend({ cancelToken: this.cancelToken.token, trendType: this.type });
  },

  methods: {
    ...mapActions(["getProcessTrend"])
  },

  computed: {
    ...mapState(["process_trend_loading", "process_trend_load_error", "process_trend_data"]),

    yAxis() {
      if (this.type === "heapTrend") {
        return ["rss", "heap_total", "heap_used"];
      }

      if (this.type === "cpuTrend") {
        return ["now", "cpu_15", "cpu_30", "cpu_60"];
      }
    },

    areaData() {
      const process_trend_data = this.process_trend_data;

      if (this.type === "heapTrend") {
        return process_trend_data.map(item => {
          for (const key of this.yAxis) {
            item[key] = Math.round(item[key] / 1024 / 1024);
          }
          return item;
        });
      }

      return process_trend_data;
    }
  }
};