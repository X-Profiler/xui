"use strict";

export default {
  methods: {
    updateSelectedProcess(data) {
      this.processData = data;
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