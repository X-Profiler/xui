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

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActionsAnalytics(["downloadFile"])
  },

  computed: {
    ...mapState(["diagData"]),

    ...mapStateAnalytics(["file_loading", "file_load_error", "file_data"]),

    overviewData() {
      const data = this.file_data;
      if (!data) {
        return [];
      }

      const { pid, nodeVersion, loadTime, heapStatistics: { heapTotalCommitted, heapTotalAvailable } } = data;

      return [
        { label: "ProcessID", value: pid },
        { label: "Node.js 版本", value: nodeVersion },
        { label: "堆内存状态 (Committed / HeapAvailable)", value: `${utils.formatSize(heapTotalCommitted)} / ${utils.formatSize(heapTotalAvailable)}` },
        { label: "启动时间", value: loadTime }
      ];
    }
  }
};