"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateDashboard } = utils.createNamespace("dashboard");
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.takeAction({ cancelToken: this.cancelToken.token, status: 0 });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setTakeActionModal"]),

    ...mapActions(["takeAction"]),

    closeTakeActionModal() {
      this.setTakeActionModal({ status: false });
    },

    closeSampling() {
      this.takeAction({ cancelToken: this.cancelToken.token, status: 1 });
    }
  },

  computed: {
    ...mapStateDashboard(["appId"]),

    ...mapState(["takeActionData", "take_action_loading", "take_action_load_error", "take_action_data"]),

    actionTip() {
      const takeActionData = this.takeActionData || {};
      const action = takeActionData.action;
      let tip = "";
      switch (action) {
        case "cpuprofile":
          tip = "CPU 采样";
          break;
        case "heapsnapshot":
          tip = "堆快照";
          break;
        case "heapprofile":
          tip = "Heap 采样";
          break;
        case "gcprofile":
          tip = "GC 采样";
          break;
        case "diag":
          tip = "诊断报告";
          break;
        case "core":
          tip = "核心转储";
          break;
        default:
          break;
      }

      return tip;
    },

    actionRunningTip() {
      const takeActionData = this.takeActionData || {};
      const action = takeActionData.action;
      let tip = "采样正在进行中，是否需要立即结束";
      switch (action) {
        case "cpuprofile":
          tip = `CPU ${tip}`;
          break;
        case "heapprofile":
          tip = `Heap ${tip}`;
          break;
        case "gcprofile":
          tip = `GC ${tip}`;
          break;
        default:
          break;
      }

      return tip;
    },

    isRunning() {
      const takeActionData = this.takeActionData || {};
      const action = takeActionData.action;
      const error = this.take_action_load_error;
      return !["heapsnapshot", "diag", "core"].includes(action)
        && error
        && error.includes("is running")
        && !error.includes("conflict action");
    },
  }
};