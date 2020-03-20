"use strict";

import * as utils from "../../lib/utils";

const { mapState: mapStateDashboard } = utils.createNamespace("dashboard");
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.saveProcessTrend({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setSaveTrendModal"]),

    ...mapActions(["saveProcessTrend"]),

    closeSaveTrendModal() {
      this.setSaveTrendModal({ status: false });
    }
  },

  computed: {
    ...mapStateDashboard(["appId"]),

    ...mapState(["save_trend_loading", "save_trend_load_error", "save_trend_data"])
  }
};