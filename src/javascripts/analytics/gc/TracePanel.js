"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters } = utils.createNamespace("dashboard/analytics/gc");

export default {
  methods: {
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
        changeSize = `+${changeSize}MB`
      } else {
        changeSize = `${changeSize}MB`
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
    }
  },

  watch: {
    selectGc() {
      if (utils.isNumber(this.selectGc)) {
        this.gcTime = this.selectGc;
      }
    }
  }
};