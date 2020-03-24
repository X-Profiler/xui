"use strict";

export default {
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
  }
};