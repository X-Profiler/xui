"use strict";

export default {
  methods: {
    updateSelectedProcess(data) {
      this.processData = data;
    },

    splitTime(time) {
      if (!time) return ["", ""];
      return time.split(" ");
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