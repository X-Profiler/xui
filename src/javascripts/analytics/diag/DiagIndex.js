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

    ...mapStateAnalytics(["file_loading", "file_load_error", "file_data"]),

    overviewData() {
      const overview = [];
      const data = this.file_data;
      if (!data) {
        return overview;
      }

      const { pid, nodeVersion, loadTime, heapStatistics: { heapTotalUsed, heapLimit } } = data;

      return [
        { lable: "ProcessID", value: pid },
        { lable: "Node.js 版本", value: nodeVersion },
        { lable: "堆内存状态", value: `${utils.formatSize(heapTotalUsed)} / ${utils.formatSize(heapLimit)}` },
        { lable: "启动时间", value: loadTime }
      ];
    }
  }
};