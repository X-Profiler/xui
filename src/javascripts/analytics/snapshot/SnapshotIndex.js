"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/file/wrapper");

export default {
  created() {
    this.downloadFile({
      fileId: this.snapshotData.fileId,
      fileType: this.snapshotData.fileType,
      fileName: this.snapshotData.fileBasename,
    });
  },

  beforeDestroy() {
    this.request && this.request.abort();
    this.request = null;
  },

  methods: {
    downloadFile({ fileId, fileType, fileName }) {
      const xhr = new XMLHttpRequest();
      const url = `/file/download?fileId=${fileId}&fileType=${fileType}`;
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.addEventListener("progress", progress);
      xhr.onload = onload;
      xhr.send(null);

      const that = this;

      function progress(e) {
        const progress = `已下载: ${utils.formatSize(e.loaded)}`;
        this.progress = progress;
      }

      async function onload() {
        const status = xhr.status;
        if ([0, 200, 304].indexOf(status) === -1) {
          const error = `加载堆快照失败，错误码: ${status}`;
          that.error = error;
        } else {
          this.file = new File([this.response], fileName);
        }
      }
    }
  },

  computed: {
    ...mapState(["snapshotData"]),
  }
};