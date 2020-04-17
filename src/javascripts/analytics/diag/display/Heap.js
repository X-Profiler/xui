"use strict";

import * as utils from "@/javascripts/lib/utils";

import { createLaterFunction } from "@/javascripts/lib/utils";
const { mapState } = utils.createNamespace("dashboard/instance/process");
const { mapState: mapStateAnalytics } = utils.createNamespace("dashboard/analytics");

export default {
  mounted() {
    this.tooltip = this.$refs.tooltip;

    this.setWidth();
    window.addEventListener("resize", this.setWidth.bind(this));
  },

  methods: {
    setWidth() {
      if (this.$refs.heapGroup) {
        this.heapGroupWidth = parseInt(window.getComputedStyle(this.$refs.heapGroup).width, 10) - 110;
      }
    },

    ...createLaterFunction("mousemove", function (name, data, event) {
      this.selectedData = {
        name,
        size: utils.formatSize(data)
      };
      this.tooltip.showToolTip(this.heapGroupWidth, event, 70);
    }),

    ...createLaterFunction("mouseleave", function () {
      this.tooltip.removeToolTip();
    }),
  },

  computed: {
    ...mapState(["colors"]),

    ...mapStateAnalytics(["file_data"]),

    heapData() {
      const { heapStatistics: { heapTotal, heapTotalUsed, heapLimit } } = this.file_data;

      let usedLimitStyle = "";
      const usedLimtPect = heapTotalUsed / heapLimit * 100;
      usedLimitStyle += `width: ${usedLimtPect}%;`;

      let usedTotalStyle = "";
      const usedTotalPect = heapTotalUsed / heapTotal * 100;
      usedTotalStyle += `width: ${usedTotalPect}%;`;

      return {
        heapTotal, heapTotalUsed, heapLimit,
        usedTotalStyle, usedTotalPect: `${usedTotalPect.toFixed(2)}%`,
        usedLimitStyle, usedLimtPect: `${usedLimtPect.toFixed(2)}%`,
      };
    },

    heapSpaces() {
      const { heapSpaceStatistics } = this.file_data;

      let totapSpaceSize = 0;
      for (const space of heapSpaceStatistics) {
        totapSpaceSize += space.size;
      }

      return heapSpaceStatistics.map((space, index) => {
        const width = `width: ${space.size / totapSpaceSize * 100}%;`;
        const color = `background-color: ${this.colors[index % this.colors.length]};`;

        return {
          width, color,
          name: space.name,
          size: space.size
        };
      });
    }
  }
};