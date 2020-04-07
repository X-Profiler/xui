"use strict";

export default {
  created() {
    this.updateOperation();
  },

  methods: {
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
      }

      // file transferred
      if (status === 3) {
        operations.push(this.doneButton("已生成", "md-brush", "success", true));
        operations.push(...this.createDoneGroup("再转储", "md-cloud-upload", "success"));
        if (this.devtools.includes(data.fileType)) {
          operations.push(...this.createDoneGroup("devtools", "md-search", "info"));
        }
        if (this.devtools2.includes(data.fileType)) {
          operations.push(...this.createDoneGroup("devtools", "md-search", "info"));
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

      this.operations = operations;
    },

    takeAction({ raw, label }) {
      if (!raw) {
        return;
      }
      const { fileId } = raw;
      if (label === "收藏") {
        const { fileFavor } = raw;
        console.log(fileId, fileFavor);
      }
    }
  },

  watch: {
    row() {
      this.updateOperation();
    }
  }
};