"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapGetters } = utils.createNamespace("dashboard/analytics/gc");

export default {
  methods: {
    linkage(name, [data]) {
      for (const chart of this.charts) {
        if (chart.name !== name) {
          this.$refs[chart.name].showTip(data);
        }
      }
    },

    hidden(name) {
      for (const chart of this.charts) {
        if (chart.name !== name) {
          this.$refs[chart.name].hiddenTip();
        }
      }
    }
  },

  computed: {
    ...mapGetters(["pauseTimeWithStart", "memoryChangeWithStart"]),

    charts() {
      return [
        { name: "histogram" },
        { name: "area" },
      ];
    }
  }
};