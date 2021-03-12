"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/file/wrapper");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    console.log(this.snapshotData);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  computed: {
    ...mapState(["snapshotData"]),
  }
};