"use strict";

import * as moment from "moment";

export default {
  methods: {
    updateSelectedProcess(data) {
      this.processData = {
        pid: data.pid,
        cmd: data.cmd,
        startTime: moment(data.startTime).format("YYYY-MM-DD HH:mm:SS"),
        updateTime: moment(data.updateTime).format("YYYY-MM-DD HH:mm:SS"),
        color: data.color
      };
    }
  },

  computed: {
    panelStyle() {
      const processData = this.processData;
      let style = "";

      // add color
      if (processData.color) {
        style += "background-color: " + processData.color + ";"
      }

      return style;
    }
  }
};