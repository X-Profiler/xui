"use strict";

import * as utils from "@/javascripts/lib/utils";

const { isNumber, formatTime } = utils;
const { mapState: mapStateInstance } = utils.createNamespace("dashboard/instance");
const { mapState, mapActions } = utils.createNamespace("dashboard/instance/system");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getSystemOverview({ cancelToken: this.cancelToken.token });
  },

  mounted() {
    this.pieCommon = this.$refs.pieCommon;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getSystemOverview"]),

    getColor(percentage) {
      return this.$refs.pieCommon.getColor(percentage);
    }
  },

  computed: {
    ...mapState(["overview_loading", "overview_load_error", "overview_data"]),

    ...mapStateInstance(["agentId"]),

    pies() {
      const overview_data = this.overview_data;
      if (!overview_data) {
        return [];
      }
      const pies = [];
      if (isNumber(overview_data.osCpu)) {
        pies.push({ title: "CPU 使用率", percentage: overview_data.osCpu });
      } else {
        pies.push({ fake: true, message: "暂无系统 CPU 信息" });
      }

      if (isNumber(overview_data.osMem)) {
        pies.push({ title: "MEM 使用率", percentage: overview_data.osMem });
      } else {
        pies.push({ fake: true, message: "暂无系统 Memory 信息" });
      }

      return pies;
    },

    disks() {
      const overview_data = this.overview_data;
      if (!overview_data) {
        return {};
      }

      const disks = {};
      if (isNumber(overview_data.maxDisk)) {
        disks.title = "Disk 使用率";
        disks.percentage = overview_data.maxDisk;
      } else {
        disks.fake = true;
        disks.message = "暂无系统磁盘信息";
      }

      if (overview_data.disks) {
        disks.list = Object.entries(overview_data.disks).map(([disk, percentage]) => ({ disk, percentage }));
        disks.list.sort((o, n) => o.percentage < n.percentage ? 1 : -1);
      } else {
        disks.list = [];
      }

      return disks;
    },

    currentMetrics() {
      const overview_data = this.overview_data;
      if (!overview_data) {
        return [];
      }
      const metrics = [[], [], []];

      const {
        load1, load5, load15,
        nodeCount,
        scavengeTotal, scavengeAverage,
        marksweepTotal, marksweepAverage,
        rtAverage, rtExpired,
        qps
      } = overview_data;

      metrics[0].push({ key: "Load1 / 5 / 15", value: `${isNumber(load1) && load1 || "-"} / ${isNumber(load5) && load5 || "-"} / ${isNumber(load15) && load15 || "-"}` });
      metrics[0].push({ key: "Node.js 进程数", value: isNumber(nodeCount) && nodeCount || "-" });
      metrics[1].push({ key: "Scavenge Total / Avg", value: `${isNumber(scavengeTotal) && formatTime(scavengeTotal) || "-"} / ${isNumber(scavengeAverage) && formatTime(scavengeAverage) || "-"}` });
      metrics[1].push({ key: "Marksweep Total / Avg", value: `${isNumber(marksweepTotal) && formatTime(marksweepTotal) || "-"} / ${isNumber(marksweepAverage) && formatTime(marksweepAverage) || "-"}` });
      metrics[2].push({ key: "RT Expired / Avg", value: `${isNumber(rtAverage) && formatTime(rtAverage) || "-"} / ${isNumber(rtExpired) && rtExpired || "-"}` });
      metrics[2].push({ key: "QPS", value: isNumber(qps) && qps || "-" });

      return metrics;
    }
  },

  watch: {
    agentId() {
      this.getSystemOverview({ cancelToken: this.cancelToken.token });
    }
  }
};