"use strict";

export default {
  created() {
    this.updateOperation();
  },

  methods: {
    createButton(label, bt, icon, loading = false, disabled = false, color) {
      if (bt === "success") {
        color = this.successColor;
      }
      return {
        type: "button",
        label, bt, icon, loading, disabled, color
      };
    },

    loadingButton(label, bt) {
      return this.createButton(label, bt, undefined, true, false);
    },

    disableButton(label, icon) {
      return this.createButton(label, undefined, icon, false, true, this.disableColor);
    },

    doneButton(label, icon, bt) {
      return this.createButton(label, bt, icon, false, false);
    },

    createLine(color) {
      return { type: "line", color };
    },

    updateOperation() {
      const operations = [];
      const data = this.row;
      const status = data.fileStatus;

      // file creating
      if (status === 0) {
        operations.push(this.loadingButton("生成中"));
        operations.push(this.disableLine);
        operations.push(this.disableButton("转储", "md-cloud-upload"));
        if (this.devtools.includes(data.fileType)) {
          operations.push(this.disableLine);
          operations.push(this.disableButton("devtools", "md-search"));
        }
        if (this.xprofiler.includes(data.fileType)) {
          operations.push(this.disableLine);
          operations.push(this.disableButton("xprofiler", "md-search"));
        }
        operations.push(this.disableLine);
        operations.push(this.disableButton("下载", "md-cloud-download"));
        operations.push(this.disableLine);
        operations.push(this.disableButton("收藏", "md-star"));
      }

      // file created
      if (status === 1) {
        operations.push(this.doneButton("已生成", "md-brush", "success"));
        operations.push(this.successLine);
        operations.push(this.doneButton("转储", "md-cloud-upload", "success"));
        if (this.devtools.includes(data.fileType)) {
          operations.push(this.disableLine);
          operations.push(this.disableButton("devtools", "md-search"));
        }
        if (this.xprofiler.includes(data.fileType)) {
          operations.push(this.disableLine);
          operations.push(this.disableButton("xprofiler", "md-search"));
        }
        operations.push(this.disableLine);
        operations.push(this.disableButton("下载", "md-cloud-download"));
        operations.push(this.disableLine);
        operations.push(this.disableButton("收藏", "md-star"));
      }

      this.operations = operations;
    }
  },

  computed: {
    disableLine() {
      return this.createLine(this.disableColor);
    },

    successLine() {
      return this.createLine(this.successColor);
    }
  },

  watch: {
    row() {
      this.updateOperation();
    }
  }
};