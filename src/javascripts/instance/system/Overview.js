"use strict";

import * as utils from "@/javascripts/lib/utils";

const { isNumber, formatTime } = utils;

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
        scavengeMax, scavengeAverage,
        marksweepMax, marksweepAverage,
        rtMax, rtAverage,
        qps
      } = overview_data;

      if (isNumber(load1) && isNumber(load5) && isNumber(load15)) {
        metrics[0].push({ key: "Load1 / 5 / 15", value: `${load1} / ${load5} / ${load15}` });
      }

      if (isNumber(nodeCount)) {
        metrics[0].push({ key: "Node.js 进程数", value: nodeCount });
      }

      if (isNumber(scavengeMax) && isNumber(scavengeAverage)) {
        metrics[1].push({ key: "Scavenge Max / Avg", value: `${formatTime(scavengeMax)} / ${formatTime(scavengeAverage)}` });
      }

      if (isNumber(marksweepMax) && isNumber(marksweepAverage)) {
        metrics[1].push({ key: "Marksweep Max / Avg", value: `${formatTime(marksweepMax)} / ${formatTime(marksweepAverage)}` });
      }

      if (isNumber(rtMax) && isNumber(rtAverage)) {
        metrics[2].push({ key: "RT Max / Avg", value: `${formatTime(rtMax)} / ${formatTime(rtAverage)}` });
      }

      if (isNumber(qps)) {
        metrics[2].push({ key: "QPS", value: qps });
      }

      return metrics;
    }
  }
};