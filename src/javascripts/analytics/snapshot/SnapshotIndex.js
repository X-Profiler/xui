"use strict";

import * as utils from "@/javascripts/lib/utils";
import ChunkedFileReader from "@/javascripts/analytics/snapshot/FileReader";
import SnapshotLoader from "@/javascripts/analytics/snapshot/SnapshotLoader";

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
      const xhr = this.request = new XMLHttpRequest();
      const url = `/file/download?fileId=${fileId}&fileType=${fileType}`;
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.addEventListener("progress", progress);
      xhr.onload = onload;
      xhr.send(null);

      const that = this;

      function progress(e) {
        that.fileSize = e.loaded;
        const progress = `${utils.formatSize(e.loaded, 2, false, true)}`;
        that.theme = 1;
        that.progress = { left: "已下载", right: `${progress}` };
        that.loading = false;
      }

      async function onload() {
        const status = xhr.status;
        if ([0, 200, 304].indexOf(status) === -1) {
          const error = `加载堆快照失败，错误码: ${status}`;
          that.error = error;
        } else {
          that.file = new File([this.response], fileName);
          that.parseSnapshot();
        }
      }
    },

    async parseSnapshot() {
      this.theme = 0;
      this.progress = "准备解析堆快照";
      const reader = new ChunkedFileReader(this.file, 10000000);
      const loader = new SnapshotLoader({
        updateStatus: progress => this.progress = progress
      }, async () => this.showResult(await loader.buildSnapshot()));
      const success = await reader.read(loader);
      if (!success) {
        this.error = reader.error().message;
      }
    },

    showResult(profile) {
      this.progress = null;
      this.profile = profile;
    }
  },

  computed: {
    ...mapState(["snapshotData"]),

    overviewData() {
      const { retainedSizes, nodes, edges, gcroots } = this.profile;

      return [
        { label: "堆快照文件", value: utils.formatSize(this.fileSize) },
        { label: "堆空间大小", value: utils.formatSize(retainedSizes[0]) },
        { label: "Heap Objects", value: nodes },
        { label: "Heap Edges", value: edges },
        { label: "GC Roots", value: gcroots }
      ];
    }
  }
};