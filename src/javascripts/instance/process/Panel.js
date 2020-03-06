"use strict";

import { tags } from "../../config";
import * as utils from "../../lib/utils";

const { mapState } = utils.createNamespace("dashboard/instance");

const drawerTag = "YES";

export default {
  mounted() {
    const query = this.$route.query;
    this.handleDrawer(query, this.processesDrawerKey);
  },

  methods: {
    handleDrawer(query, key) {
      const drawer = this.$refs[key];
      if (query[key] === drawerTag) {
        drawer.open();
      } else {
        drawer.close();
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

    openDrawer(key) {
      const route = this.$route;
      const query = Object.assign({}, route.query, { [key]: drawerTag });
      this.$router.push({ path: route.path, query });
    },

    closeDrawer(key) {
      const route = this.$route;
      if (route.query[key] === drawerTag) {
        this.$router.go(-1);
      }
    }
  },

  computed: {
    ...mapState(["agentId"]),

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
      this.handleDrawer(to.query, this.processesDrawerKey);
    },
  }
};