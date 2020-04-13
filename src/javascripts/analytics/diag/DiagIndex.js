"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/file/wrapper");
const { mapState: mapStateAnalytics, mapActions: mapActionsAnalytics } = utils.createNamespace("dashboard/analytics");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.downloadFile({
      cancelToken: this.cancelToken.token,
      fileId: this.diagData.fileId,
      fileType: this.diagData.fileType
    });
  },

  methods: {
    ...mapActionsAnalytics(["downloadFile"])
  },

  computed: {
    ...mapState(["diagData"]),

    ...mapStateAnalytics(["file_loading", "file_load_error", "file_data"])
  }
};