"use strict";

import * as utils from "../../lib/utils";
const { mapState, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getNodeProcesses(this.cancelToken.token);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getNodeProcesses"]),
  },

  computed: {
    ...mapState(["processesLoading", "processesLoadError", "processes"])
  }
};