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
    },

    linkage(data) {
      this.$emit("linkage", data);
    },

    hidden() {
      this.$emit("hidden");
    },

    showTip(data) {
      const area = this.$refs.area;
      area && area.showTip(data);
    },

    hiddenTip() {
      const area = this.$refs.area;
      area && area.hiddenTip();
    }
  },

  computed: {
    yAxis() {
      let yAxis = []
      if (this.type === "heapTrend") {
        yAxis = ["rss", "heap_total", "heap_used"];
      }

      if (this.type === "cpuTrend") {
        yAxis = ["cpu_now", "cpu_15", "cpu_30", "cpu_60"];
      }

      return yAxis;
    },

    yAxisUnit() {
      let yAxisUnit = ""
      if (this.type === "heapTrend") {
        yAxisUnit = "MB";
      }

      if (this.type === "cpuTrend") {
        yAxisUnit = "%"
      }

      return yAxisUnit
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
    },

    noDataText() {
      let text = "";

      if (this.type === "heapTrend") {
        text = "暂无内存趋势数据";
      }

      if (this.type === "cpuTrend") {
        text = "暂无 CPU 趋势数据";
      }

      return text;
    }
  }
};