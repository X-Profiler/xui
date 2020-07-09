"use strict";

import * as utils from "@/javascripts/lib/utils";
import { fetchSvgRenderContext } from "@/javascripts/analytics/flamegraph/ProfileParser";

const { mapState } = utils.createNamespace("dashboard/file/wrapper");
const { mapState: mapStateAnalytics, mapActions: mapActionsAnalytics } = utils.createNamespace("dashboard/analytics");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.downloadFile({
      cancelToken: this.cancelToken.token,
      fileId: this.flamegraphData.fileId,
      fileType: this.flamegraphData.fileType
    });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActionsAnalytics(["downloadFile"])
  },

  computed: {
    ...mapState(["flamegraphData"]),

    ...mapStateAnalytics(["file_loading", "file_load_error", "file_data"]),

    customData() {
      return fetchSvgRenderContext(this.file_data);
    }
  }
};