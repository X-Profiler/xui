"use strict";

import * as utils from "../../lib/utils";

const { mapState: mapStateDashboard } = utils.createNamespace("dashboard");
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.takeAction({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setTakeActionModal"]),

    ...mapActions(["takeAction"]),

    closeTakeActionModal() {
      this.setTakeActionModal({ status: false });
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
          tip = "CPU 采样约 5min ";
          break;
        case "heapsnapshot":
          tip = "获取堆快照";
          break;
        case "heapprofile":
          tip = "Heap 采样约 5min ";
          break;
        case "gcprofile":
          tip = "GC 采样约 5min ";
          break;
        case "diag":
          tip = "获取诊断报告";
          break;
        default:
          break;
      }

      return tip;
    }
  }
};