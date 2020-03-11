"use strict";

import * as utils from "../../lib/utils";

const { mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getTrendData();
  },

  methods: {
    ...mapActions(["getProcessTrend"]),

    getTrendData() {
      this.loading = true;
      this
        .getProcessTrend({ cancelToken: this.cancelToken.token, trendType: this.type })
        .then(data => {
          const { list } = data;
          if (Array.isArray(list)) {
            this.trendData = list;
          }
        })
        .catch(err => this.loadError = err.message)
        .then(() => this.loading = false);
    }
  },

  computed: {
    yAxis() {
      if (this.type === "heapTrend") {
        return ["rss", "heap_total", "heap_used"];
      }

      if (this.type === "cpuTrend") {
        return ["now", "cpu_15", "cpu_30", "cpu_60"];
      }
    },

    areaData() {
      const trendData = this.trendData;

      if (this.type === "heapTrend") {
        return trendData.map(item => {
          for (const key of this.yAxis) {
            item[key] = Math.round(item[key] / 1024 / 1024);
          }
          return item;
        });
      }

      return trendData;
    }
  }
};