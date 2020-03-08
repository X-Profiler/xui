"use strict";

import * as utils from "../../lib/utils";
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

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
    ...mapState(["processes_loading", "processes_load_error", "processes_data"])
  }
};