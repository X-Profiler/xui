"use strict";

import * as utils from "@/javascripts/lib/utils";

export default {
  created() {
    const query = this.$route.query;
    if (utils.isNumber(query.duration)) {
      this.duration = Number(query.duration);
    } else {
      this.duration = 24;
    }
  },

  methods: {
    showTip(refs, data) {
      for (const ref of refs) {
        const element = this.$refs[ref][0];
        element && element.showTip(data);
      }
    },

    handleBroadcase(refs, data) {
      for (const ref of refs) {
        const element = this.$refs[ref][0];
        element && element.handleBroadcase(data);
      }
    },

    hiddenTip(refs) {
      for (const ref of refs) {
        this.$refs[ref][0].hiddenTip();
      }
    },

    linkage(data) {
      this.showTip(this.chartRefs, data);
    },

    hidden() {
      this.hiddenTip(this.chartRefs);
    },

    broadcast(data) {
      this.handleBroadcase(this.chartRefs, data);
    },
  },

  computed: {
    chartRefs() {
      const refs = [];
      for (const charts of this.chartGroup) {
        for (const { value } of charts) {
          refs.push(value);
        }
      }
      return refs;
    }
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "duration", "duration");
    },

    duration(...args) {
      utils.watchQueryKey.call(this, "duration", "duration", args);
    },
  }
};