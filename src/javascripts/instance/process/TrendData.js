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

    updateSelectedData(data) {
      if (this.solid) {
        this.selectedData = data;
      }
    },

    getTrendData() {
      this.loading = true;
      this
        .getProcessTrend({ cancelToken: this.cancelToken.token, trendType: this.type })
        .then(data => {
          const { list } = data;
          if (Array.isArray(list)) {
            this.trendData = list;
          }
          if (data.limit && !isNaN(data.limit)) {
            this.limit = data.limit;
          }
          this.checkStatus(this.lastValidData);
          this.updateSelectedData(this.lastValidData);
        })
        .catch(err => this.loadError = err.message)
        .then(() => this.loading = false);
    },

    setStatus(usage, values) {
      return usage < 60 ? values[0] : usage < 85 ? values[1] : values[2];
    },

    checkStatus(trend) {
      const type = this.type;
      const limit = this.limit;
      const trendStatus = {};

      const labels = ["健康态", "警告态", "紧急态"];

      if (type === "heapTrend") {
        const heapUsage = trend.heap_used * 1024 * 1024 / limit * 100;
        const tips = [
          "堆内存使用率在正常范围内 ( 0 - 60% )",
          "堆内存使用率偏高 ( 60% - 85% )",
          "堆内存使用率极高 ( 85%+ )"
        ];

        trendStatus.status = heapUsage;
        trendStatus.statusLabel = this.setStatus(heapUsage, labels);
        trendStatus.statusTip = this.setStatus(heapUsage, tips);
      }

      if (type === "cpuTrend") {
        const cpuUsage = trend.cpu_60;
        const tips = [
          "一分钟内 CPU 平均使用率在正常范围内 ( 0 - 60% )",
          "一分钟内 CPU 平均使用率偏高 ( 60% - 85% )",
          "一分钟内 CPU 平均使用率极高 ( 85%+ )"
        ];

        trendStatus.status = cpuUsage;
        trendStatus.statusLabel = this.setStatus(cpuUsage, labels);
        trendStatus.statusTip = this.setStatus(cpuUsage, tips);
      }

      if (type === "gcTrend") {
        const scavengeDuration = trend.scavenge_duration * this.gcUnit.scale;
        const marksweepDuration = trend.marksweep_duration * this.gcUnit.scale;
        const tips = [
          "一分钟内 GC 平均耗费在正常范围内 ( 0 - 5% )",
          "一分钟内 GC 平均耗费偏高 ( 5% - 15% )",
          "一分钟内 GC 平均耗费极高 ( 15%+ )"
        ];

        const gcUsage = (scavengeDuration + marksweepDuration) / (60 * 1000);
        trendStatus.status = gcUsage;
        trendStatus.statusLabel = this.setStatus(gcUsage, labels);
        trendStatus.statusTip = this.setStatus(gcUsage, tips);
      }

      this.trendStatus = trendStatus;
    },

    updateStatus(trend) {
      this.checkStatus(trend);
      this.updateSelectedData(trend);
    },

    linkage(data) {
      this.$emit("linkage", data);
    },

    broadcast(data) {
      this.$emit("broadcast", data);
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
    },

    handleBroadcase(data) {
      const area = this.$refs.area;
      area && area.handleBroadcase(data);
    }
  },

  computed: {
    gcUnit() {
      let maxDuration = 0;
      for (const duration of this.trendData) {
        if (duration.scavenge_duration > maxDuration) {
          maxDuration = duration.scavenge_duration;
        }
        if (duration.marksweep_duration > maxDuration) {
          maxDuration = duration.marksweep_duration;
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
      const common = { yAxis: [], yAxisUnit: "", noDataText: "", showStatus: false };
      if (type === "heapTrend") {
        common.yAxis = ["rss", "heap_total", "heap_used"];
        common.yAxisUnit = "MB";
        common.noDataText = "暂无内存趋势数据";
        common.showStatus = true;
      }

      if (type === "cpuTrend") {
        common.yAxis = ["cpu_now", "cpu_15", "cpu_30", "cpu_60"];
        common.yAxisUnit = "%";
        common.noDataText = "暂无 CPU 趋势数据";
        common.showStatus = true;
      }

      if (type === "heapSpaceTrend") {
        common.yAxis = ["old_space", "new_space", "map_space", "lo_space",
          "code_space", "read_only_space", "new_lo_space", "code_lo_space"];
        common.yAxisUnit = "MB";
        common.noDataText = "暂无堆空间趋势数据";
        common.showStatus = true;
      }

      if (type === "gcTrend") {
        common.yAxis = ["scavenge_duration", "marksweep_duration"];
        common.yAxisUnit = this.gcUnit.label;
        common.noDataText = "暂无 GC 趋势数据";
        common.showStatus = true;
      }

      if (type === "uvTrend") {
        common.yAxis = ["active_handles"];
        common.yAxisUnit = "";
        common.noDataText = "暂无 Libuv 趋势数据";
        common.showStatus = true;
      }

      if (type === "qpsTrend") {
        common.yAxis = ["qps"];
        common.yAxisUnit = "";
        common.noDataText = "暂无 QPS 趋势数据";
        common.showStatus = true;
      }

      if (type === "timerTrend") {
        common.yAxis = ["active_timers"];
        common.yAxisUnit = "";
        common.noDataText = "暂无 Timer 趋势数据";
        common.showStatus = true;
      }

      if (type === "tcpTrend") {
        common.yAxis = ["active_tcp_handles"];
        common.yAxisUnit = "";
        common.noDataText = "暂无 TCP 趋势数据";
        common.showStatus = true;
      }

      if (type === "udpTrend") {
        common.yAxis = ["active_udp_handles"];
        common.yAxisUnit = "";
        common.noDataText = "暂无 UDP 趋势数据";
        common.showStatus = true;
      }

      return common;
    },

    chartData() {
      const type = this.type;
      const commonData = this.commonData;
      const trendData = this.trendData;

      if (["heapTrend", "heapSpaceTrend"].includes(type)) {
        return trendData.map(item => {
          for (const key of commonData.yAxis) {
            item[key] = Math.round(item[key] / 1024 / 1024);
          }
          return item;
        });
      }

      if (["gcTrend"].includes(type)) {
        const scale = this.gcUnit.scale;
        return trendData.map(item => {
          const tmp = Object.assign({}, item);
          for (const key of commonData.yAxis) {
            tmp[key] = item[key] / scale;
          }
          return tmp;
        });
      }

      return trendData;
    },

    lastValidData() {
      const yAxis = this.commonData.yAxis;
      const chartData = this.chartData;
      let length = chartData.length;
      while (length) {
        length--;
        const data = chartData[length];
        if (yAxis.every(axis => data[axis] === 0 || !isNaN(data[axis]))) {
          return data;
        }
      }
    },

    statusLabelStyle() {
      let style = "";
      const colors = ["#19be6b", "#ff9900", "#ed4014"];
      style += "background-color: " + this.setStatus(this.trendStatus.status, colors) + ";";
      return style;
    }
  }
};