"use strict";

import * as utils from "@/javascripts/lib/utils";

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
          const { list, extra } = data;
          if (Array.isArray(list)) {
            this.trendData = list;
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

      return common;
    },

    chartData() {
      const trendData = this.trendData;

      return trendData;
    },
  }
};