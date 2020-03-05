"use strict";

import { tags } from "../../config";
import * as utils from "../../lib/utils";

export default {
  mounted() {
    this.drawer = this.$refs.drawer;

    const query = this.$route.query;
    this.handleProcesses(query);

  },

  methods: {
    handleProcesses(query) {
      // check need show processes
      if (query.processes === "YES") {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    },

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
      const route = this.$route;
      const query = Object.assign({}, route.query, { processes: "YES" });
      this.$router.push({ path: route.path, query });
    },

    closeProcessDrawer() {
      const route = this.$route;
      const query = Object.assign({}, route.query, { processes: undefined });
      this.$router.replace({ path: route.path, query });
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
  },

  watch: {
    $route(to) {
      this.handleProcesses(to.query);
    },
  }
};