"use strict";

import { tags } from "../../config";
import * as utils from "../../lib/utils";

const { mapState } = utils.createNamespace("dashboard/instance");
const { mapState: mapStateProcess, mapGetters: mapGettersProcess, mapMutations: mapMutationsProcess } = utils.createNamespace("dashboard/instance/process");
const { mapMethods, mapWatch, handleMounted } =
  utils.drawerRouteFactory("drawerQueryKey", "processTrendDrawer", "trend", "setProcessTrendDrawer");
const { mapMethods: mapMethodsProcesses, mapWatch: mapWatchProcesses, handleMounted: handleMountedProcesses } =
  utils.drawerRouteFactory("drawerQueryKeyProcesses", "processesDrawer", "processes", "setProcessesDrawer");
const { mapMethods: mapMethodsSaveTrend, mapWatch: mapWatchSaveTrend, handleMounted: handleMountedSaveTrend } =
  utils.modalRouteFactory("modalQueryKeySaveTrend", "saveTrendModal", "saveTrend", "setSaveTrendModal");
const { mapMethods: mapMethodsActions, mapWatch: mapWatchActions, handleMounted: handleMountedActions } =
  utils.modalRouteFactory("modalQueryKeyActions", "takeActionModal", "takeAction", "setTakeActionModal");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    handleMounted.call(this, "handleProcessTrendDrawer", true, "processData");
    handleMountedProcesses.call(this, "handleProcessesDrawer", true);
    handleMountedSaveTrend.call(this, "handleSaveTrendModal");
    handleMountedActions.call(this, "handleActionModal");
  },

  methods: {
    ...mapMethods("handleProcessTrendDrawer"),
    ...mapMethodsProcesses("handleProcessesDrawer"),
    ...mapMethodsSaveTrend("handleSaveTrendModal"),
    ...mapMethodsActions("handleActionModal"),
    ...mapMutationsProcess(["setXprofilerStatusModal", "setSaveTrendModal", "setTakeActionModal",
      "setProcessTrendDrawer", "setProcessesDrawer"]),

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

    checkXprofiler() {
      this.setXprofilerStatusModal({
        status: true,
        pid: this.processData.pid
      });
    },

    openDrawer() {
      this.setProcessesDrawer({ status: true });
    },

    closeDrawer() {
      this.setProcessesDrawer({ status: false });
    },

    actDetail(type) {
      if (type === "processTrend") {
        this.setProcessTrendDrawer({ status: true, processData: this.processData });
      }

      if (type === "saveProcessData") {
        this.setSaveTrendModal({ status: true, processData: this.processData });
      }
    },

    takeAction(action) {
      this.setTakeActionModal({ status: true, actionData: { pid: this.processData.pid, action } });
    },

    closeTrendDrawer() {
      this.setProcessTrendDrawer({ status: false });
    },

    closeSaveTrendModal() {
      this.setSaveTrendModal({ status: false });
    },

    closeTakeActionModal() {
      this.setTakeActionModal({ status: false });
    },
  },

  computed: {
    ...mapState(["agentId"]),
    ...mapStateProcess(["processTrendDrawer", "processTrendData", "processesDrawer", "saveTrendModal", "takeActionModal"]),
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
    ...mapWatchProcesses,
    ...mapWatchSaveTrend,
    ...mapWatchActions,

    $route(to) {
      this.handleProcessTrendDrawer(to.query);
      this.handleProcessesDrawer(to.query);
      this.handleSaveTrendModal(to.query);
      this.handleActionModal(to.query);
    },
  }
};