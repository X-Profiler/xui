"use strict";

import * as utils from "../../lib/utils";

const { mapState, mapActions } = utils.createNamespace("dashboard/instance/system");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getSystemOverview({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getSystemOverview"])
  },

  computed: {
    ...mapState(["overview_loading", "overview_load_error", "overview_data"])
  }
};