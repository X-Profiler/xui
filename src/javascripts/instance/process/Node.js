"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    if (Array.isArray(this.processes) && this.processes.length) {
      return;
    }
    this.getNodeProcesses(this.cancelToken.token);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setXprofilerStatusModal"]),

    ...mapActions(["getNodeProcesses"]),

    checkXprofiler(row) {
      this.setXprofilerStatusModal({
        status: true,
        pid: row.pid
      });
    }
  },

  computed: {
    ...mapState(["processes_loading", "processes_load_error", "processes_data"]),

    processList() {
      return this.processes || this.processes_data;
    }
  }
};