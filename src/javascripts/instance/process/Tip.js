"use strict";

import * as moment from "moment";

export default {
  mounted() {
    this.tooltip = this.$refs.tooltip;
  },

  methods: {
    show(data, event) {
      this.processData = data;
      this.tooltip.showToolTip(event);
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
      return {
        pid: processData.pid,
        cmd: processData.cmd,
        startTime: moment(processData.startTime).format("YYYY-MM-DD HH:mm:SS"),
        updateTime: moment(processData.updateTime).format("YYYY-MM-DD HH:mm:SS"),
        color: processData.color
      };
    }
  }
};