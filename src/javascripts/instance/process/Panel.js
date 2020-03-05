"use strict";

import { tags } from "../../config";
import * as utils from "../../lib/utils";

export default {
  mounted() {
    this.drawer = this.$refs.drawer;
  },

  methods: {
    updateSelectedProcess(data) {
      this.processData = data;
    },

    splitTime(time) {
      if (!time) return ["", ""];
      return time.split(" ");
    },

    selectPid(index) {
      this.$emit("selectPid", index);
    },

    openProcessesDrawer() {
      this.drawer.open();
    }
  },

  computed: {
    panelStyle() {
      const processData = this.processData;
      let style = "";

      // add color
      if (processData.color) {
        style += "background-color: " + processData.color + ";";
      }

      return style;
    },

    checkProcessesTag() {
      return utils.getTag(tags.checkProcesses);
    },

    processListTag() {
      return utils.getTag(tags.processList);
    },

    processDetailTag() {
      return utils.getTag(tags.processDetail);
    },

    checkXprofilerTag() {
      return utils.getTag(tags.checkXprofiler);
    },

    actionsTag() {
      return utils.getTag(tags.actions);
    }
  }
};