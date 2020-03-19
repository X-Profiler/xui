"use strict";

import * as utils from "../../lib/utils";

const { mapState } = utils.createNamespace("dashboard");
const { mapMutations, mapActions } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.saveTrend();
  },

  methods: {
    ...mapMutations(["setSavetrendDrawer"]),

    ...mapActions(["saveProcessTrend"]),

    saveTrend() {
      this.loading = true;
      this
        .saveProcessTrend({ cancelToken: this.cancelToken.token })
        .then(data => {
          this.trendFile = data.file
        })
        .catch(err => this.loadError = err.message)
        .then(() => this.loading = false);
    },

    closeSaveTrendModal() {
      this.setSavetrendDrawer({ status: false });
    }
  },

  computed: {
    ...mapState(["appId"])
  }
};