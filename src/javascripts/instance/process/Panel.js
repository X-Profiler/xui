"use strict";

import { tags } from "../../config";
import * as utils from "../../lib/utils";

const { mapState } = utils.createNamespace("dashboard/instance");
const { mapState: mapStateProcess, mapGetters: mapGettersProcess, mapMutations: mapMutationsProcess } = utils.createNamespace("dashboard/instance/process");
const { mapMethods, mapWatch, handleMounted } = utils.drawerRouteFactory("processTrendDrawer", "trend", "setProcessTrendDrawer");

const drawerTag = "YES";

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    const query = this.$route.query;
    this.handleDrawer(query, this.processesDrawerKey);
    handleMounted.call(this, true, "processData");
  },

  methods: {
    ...mapMethods,

    ...mapMutationsProcess(["setXprofilerStatusModal", "setProcessTrendDrawer"]),

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
    },

    checkXprofiler() {
      this.setXprofilerStatusModal({
        status: true,
        pid: this.processData.pid
      });
    },

    actDetail(type) {
      if (type === "processTrend") {
        this.setProcessTrendDrawer({ status: true, processData: this.processData });
      }
    },

    closeTrendDrawer() {
      this.setProcessTrendDrawer({ status: false });
    }
  },

  computed: {
    ...mapState(["agentId"]),

    ...mapStateProcess(["processTrendDrawer", "processTrendData"]),

    ...mapGettersProcess(["processCount"]),

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
    ...mapWatch,

    $route(to) {
      this.handleDrawer(to.query, this.processesDrawerKey);
      this.handleComponent(to.query);
    },
  }
};