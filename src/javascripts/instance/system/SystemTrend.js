"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateInstance } = utils.createNamespace("dashboard/instance");
const { mapActions } = utils.createNamespace("dashboard/instance/system");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getTrendData();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getSystemTrend"]),

    getTrendData() {
      this.loading = true;
      this
        .getSystemTrend({ cancelToken: this.cancelToken.token, trendType: this.type })
        .then(data => {
          const { list, extra, yAxis } = data;
          if (Array.isArray(list)) {
            this.trendData = list;
          }
          if (Array.isArray(yAxis) && yAxis.length) {
            this.yAxis = yAxis;
          }
          this.extra = extra;
        })
        .catch(err => this.loadError = err.message)
        .then(() => this.loading = false);
    },

    showTip(data) {
      const area = this.$refs.area;
      area && area.showTip(data);
    },

    hiddenTip() {
      const area = this.$refs.area;
      area && area.hiddenTip();
    },

    handleBroadcase(data) {
      const area = this.$refs.area;
      area && area.handleBroadcase(data);
    },

    linkage(data) {
      this.$emit("linkage", data);
    },

    hidden() {
      this.$emit("hidden");
    },

    broadcast(data) {
      this.$emit("broadcast", data);
    },
  },

  computed: {
    ...mapStateInstance(["agentId"]),

    gcUnit() {
      let maxDuration = 0;
      for (const duration of this.trendData) {
        if (duration.scavenge_avg > maxDuration) {
          maxDuration = duration.scavenge_avg;
        }
        if (duration.marksweep_avg > maxDuration) {
          maxDuration = duration.marksweep_avg;
        }
      }

      const results = {};

      if (maxDuration < 10e2) {
        results.label = "ms";
        results.scale = 1;
      } else {
        results.label = "s";
        results.scale = 1000;
      }

      return results;
    },

    commonData() {
      const type = this.type;
      const common = { yAxis: [], yAxisUnit: "", noDataText: "" };

      if (type === "osCpuTrend") {
        common.yAxis = ["os_cpu"];
        common.yAxisUnit = "%";
        common.noDataText = "暂无系统 CPU 趋势数据";
      }

      if (type === "osMemoryTrend") {
        common.yAxis = ["os_memory"];
        common.yAxisUnit = "%";
        common.noDataText = "暂无系统内存趋势数据";
      }

      if (type === "loadTrend") {
        common.yAxis = ["load1", "load5", "load15"];
        common.yAxisUnit = "";
        common.noDataText = "暂无系统 Load 负载数据";
      }

      if (type === "nodeCountTrend") {
        common.yAxis = ["node_count"];
        common.yAxisUnit = "";
        common.noDataText = "暂无系统 Node.js 进程数趋势数据";
      }

      if (type === "osGcTrend") {
        common.yAxis = ["scavenge_avg", "marksweep_avg"];
        common.yAxisUnit = this.gcUnit.label;
        common.noDataText = "暂无整体 Node.js 进程 GC 数趋势数据";
      }

      if (type === "diskUsageTrend") {
        common.yAxis = this.yAxis;
        common.yAxisUnit = "%";
        common.noDataText = "暂无磁盘使用趋势数据";
      }

      return common;
    },

    chartData() {
      const trendData = this.trendData;

      return trendData;
    },
  },

  watch: {
    agentId() {
      this.getTrendData();
    }
  }
};