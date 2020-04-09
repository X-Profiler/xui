"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations, mapActions } = utils.createNamespace("dashboard/file");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.updateOperation();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setErrorModal"]),

    ...mapActions(["doTransfer", "doFavor"]),

    formatLabel(label) {
      if (typeof label === "string") {
        return label;
      }
      return label.label;
    },

    getColor(bt) {
      let color = this.disableColor;
      if (bt === "success") {
        color = this.successColor;
      }
      if (bt === "info") {
        color = this.infoColor;
      }
      if (bt === "warning") {
        color = this.warningColor;
      }
      if (bt === "error") {
        color = this.errorColor;
      }
      if (bt === "normal") {
        color = this.warningColor;
      }
      return color;
    },

    createButton(label, bt, icon, loading = false, disabled = false, fixed = false) {
      return {
        type: "button",
        label,
        bt: bt === "normal" ? undefined : bt,
        icon, loading, disabled,
        color: this.getColor(bt),
        fixed,
        raw: !this.fixed && this.row
      };
    },

    createLine(color) {
      return { type: "line", color };
    },

    doneButton(label, icon, bt, fixed) {
      return this.createButton(label, bt, icon, false, false, fixed);
    },

    createLoadingGroup(label, bt) {
      return [
        this.createLine(this.getColor(bt)),
        this.createButton(label, bt, undefined, true, false, true)
      ];
    },

    createDisableGroup(label, icon) {
      return [
        this.createLine(this.disableColor),
        this.createButton(label, undefined, icon, false, true, true)
      ];
    },

    createDoneGroup(label, icon, bt) {
      return [
        this.createLine(this.getColor(bt)),
        this.doneButton(label, icon, bt)
      ];
    },

    createLeftGroup(fileType) {
      const operations = [];
      if (this.devtools.includes(fileType)) {
        operations.push(...this.createDisableGroup("devtools", "md-search"));
      }
      if (this.devtools2.includes(fileType)) {
        operations.push(...this.createDisableGroup("devtools", "md-search"));
      }
      if (this.xprofiler.includes(fileType)) {
        operations.push(...this.createDisableGroup("xprofiler", "md-search"));
      }
      operations.push(...this.createDisableGroup("下载", "md-cloud-download"));
      operations.push(...this.createDisableGroup("收藏", "md-star"));
      return operations;
    },

    updateOperation() {
      const operations = [];
      const data = this.row;
      const status = data.fileStatus;

      // file creating
      if (status === 0) {
        operations.push(this.createButton("生成中", undefined, undefined, true, true, true));
        operations.push(...this.createDisableGroup("转储", "md-cloud-upload"));
        operations.push(...this.createLeftGroup(data.fileType));
        this.$emit("loading-file", data);
      }

      // file created
      if (status === 1) {
        operations.push(this.doneButton("已生成", "md-brush", "success", true));
        operations.push(...this.createDoneGroup("转储", "md-cloud-upload", "success"));
        operations.push(...this.createLeftGroup(data.fileType));
      }

      // file transferring
      if (status === 2) {
        operations.push(this.doneButton("已生成", "md-brush", "success", true));
        operations.push(...this.createLoadingGroup("转储中", "success"));
        operations.push(...this.createLeftGroup(data.fileType));
        this.$emit("loading-file", data);
      }

      // file transferred
      if (status === 3) {
        operations.push(this.doneButton("已生成", "md-brush", "success", true));
        if (data.createAgent !== "upload" && data.fileType !== "trend") {
          operations.push(...this.createDoneGroup("再转储", "md-cloud-upload", "success"));
        }
        if (this.devtools.includes(data.fileType)) {
          operations.push(...this.createDoneGroup({ label: "devtools", value: "devtools1" }, "md-search", "info"));
        }
        if (this.devtools2.includes(data.fileType)) {
          operations.push(...this.createDoneGroup({ label: "devtools", value: "devtools2" }, "md-search", "info"));
        }
        if (this.xprofiler.includes(data.fileType)) {
          operations.push(...this.createDoneGroup("xprofiler", "md-search", "info"));
        }
        operations.push(...this.createDoneGroup("下载", "md-cloud-download", "info"));
        if (data.fileFavor) {
          operations.push(...this.createDoneGroup("收藏", "md-star", "warning"));
        } else {
          operations.push(...this.createDoneGroup("收藏", "md-star", "normal"));
        }
      }

      // creating error
      if (status === 998) {
        operations.push(this.createButton("未知状态", "warning", "md-brush"));
        operations.push(...this.createDisableGroup("转储", "md-cloud-upload"));
        operations.push(...this.createLeftGroup(data.fileType));
      }

      // transferring error
      if (status === 999) {
        operations.push(this.doneButton("已生成", "md-brush", "success", true));
        operations.push(...this.createDoneGroup("转储失败", "md-close", "error"));
        operations.push(...this.createLeftGroup(data.fileType));
      }

      this.operations = operations;
    },

    doFileFavor(opt) {
      const { fileId, fileType, fileFavor } = opt.raw;
      const favor = fileFavor === undefined || fileFavor === 0 ? 1 : 0;
      opt.loading = true;
      this.doFavor({ cancelToken: this.cancelToken.token, fileId, fileType, favor })
        .then(() => {
          opt.raw.fileFavor = favor;
          this.updateOperation();
        })
        .catch(err => this.setErrorModal({ status: true, error: { title: "收藏失败", message: err.message } }))
        .then(() => opt.loading = false);
    },

    doFileTransfer(opt) {
      const { fileId, fileType } = opt.raw;
      opt.loading = true;
      opt.raw.fileStatus = 2;
      this.updateOperation();
      this
        .doTransfer({ cancelToken: this.cancelToken.token, fileId, fileType })
        .catch(err => this.setErrorModal({ status: true, error: { title: "转储失败", message: err.message } }));
    },

    handleDevtools(label, { fileId, fileType }) {
      let selectedTab = "";
      if (["cpuprofile"].includes(fileType)) {
        selectedTab = "js_profiler";
      }
      if (["heapsnapshot", "heapprofile"].includes(fileType)) {
        selectedTab = "heap_profiler";
      }
      const query = `fileType=${fileType}&fileId=${fileId}&selectedTab=${selectedTab}`;
      const href = `/dashboard/${label}?${query}`;
      window.open(href, "_blank");
    },

    takeAction(opt) {
      const { raw, label } = opt;
      if (!raw) {
        return;
      }

      if (label === "收藏") {
        this.doFileFavor(opt);
      }

      if (label === "转储" || label === "再转储" || label === "转储失败") {
        this.doFileTransfer(opt);
      }

      if (label === "未知状态") {
        opt.raw.fileStatus = 0;
        this.updateOperation();
      }

      if (["devtools1", "devtools2"].includes(label.value)) {
        this.handleDevtools(label.value, raw);
      }
    }
  },

  watch: {
    row() {
      this.updateOperation();
    }
  }
};