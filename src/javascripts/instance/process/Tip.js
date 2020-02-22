"use strict";

export default {
  mounted() {
    this.tooltip = this.$refs.tooltip;
  },

  methods: {
    show(data, maxWidth, event) {
      this.processData = data;
      this.tooltip.showToolTip(maxWidth, event);
    },

    remove() {
      this.tooltip.removeToolTip();
    }
  },

  computed: {
    activeXProcess() {
      const processData = this.processData;
      if (!processData) {
        return { pid: "未知", cmd: "未知" };
      }
      return processData;
    }
  }
};