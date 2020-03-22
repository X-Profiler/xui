"use strict";

import * as utils from "../../lib/utils";

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
      if (overview_data.osCpu === 0 || !isNaN(overview_data.osCpu)) {
        pies.push({ title: "CPU 使用率", percentage: overview_data.osCpu });
      } else {
        pies.push({ fake: true, message: "暂无系统 CPU 信息" });
      }

      if (overview_data.osMem === 0 || !isNaN(overview_data.osMem)) {
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
      if (overview_data.maxDisk === 0 || !isNaN(overview_data.maxDisk)) {
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
    }
  }
};