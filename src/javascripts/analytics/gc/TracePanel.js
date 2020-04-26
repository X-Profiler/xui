"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters } = utils.createNamespace("dashboard/analytics/gc");

export default {
  mounted() {
    this.spaces = this.$refs.spaces;

    this.setSpaceWidth();
  },

  methods: {
    setSpaceWidth() {
      if (!this.spaces) {
        return;
      }
      const width = parseInt(window.getComputedStyle(this.spaces).width, 10);
      if (!width) {
        return;
      }
      this.spacesWidth = width;
    },

    formatChartipTime(value) {
      return utils.formatTime(value, false, true, 1);
    },

    getTitleColor(type) {
      let color = "";
      switch (type) {
        case "scavenge":
          color = "#3498db";
          break;
        case "marksweep":
          color = "#ff9900";
          break;
        case "marking":
          color = "#6a5acd";
          break;
        default:
          break;
      }
      return color;
    }
  },

  computed: {
    ...mapState(["gcFile"]),

    ...mapGetters(["calculateSize"]),

    gcData() {
      return this.gcFile.gc[this.gcTime - 1];
    },

    maxDataLength() {
      return this.gcFile.gc.length;
    },

    statistics() {
      const data = this.gcData;
      const totalGcTime = this.formatChartipTime(data.totalSpentfromStart);
      let changeSize = this.calculateSize(data.after) - this.calculateSize(data.before);
      changeSize = Number((changeSize / 1024 / 1024).toFixed(2));
      if (changeSize >= 0) {
        changeSize = `+${changeSize}MB`;
      } else {
        changeSize = `${changeSize}MB`;
      }
      const pause = `${+(data.end - data.start)}ms`;

      return [
        [
          { title: "累计 GC 暂停时间", value: totalGcTime },
          { title: "累计 GC 总次数", value: data.totalTimesfromStart },
        ],
        [
          { title: "GC 堆大小变化", value: changeSize },
          { title: "GC 暂停时间", value: pause },
        ]
      ];
    },

    gcStstus() {
      const data = this.gcData;
      const type = this.showSpaceStatus;

      let total = 0;
      const needSumSpaces = ['read_only_space', 'old_space', 'code_space', 'map_space'];
      for (const space of data[type]) {
        if (needSumSpaces.includes(space.name)) {
          total += space.space_available_size;
        }
      }

      return [
        [
          { title: "所有空间已使用", value: utils.formatSize(this.calculateSize(data[type])) },
          { title: "所有空间占用", value: utils.formatSize(this.calculateSize(data[type], "space_size")) }
        ],
        [
          { title: "Page 空洞大小", value: utils.formatSize(total) },
          { title: "物理内存占用", value: utils.formatSize(this.calculateSize(data[type], "physical_space_size")) }
        ]
      ];
    }
  },

  watch: {
    selectGc() {
      if (utils.isNumber(this.selectGc)) {
        this.gcTime = this.selectGc;
      }
    },

    gcTime() {
      this.showSpaceStatus = "before";
    }
  }
};