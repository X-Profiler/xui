"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState, mapGetters, mapMutations, mapActions } = utils.createNamespace("dashboard/file");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.uploads = this.getUploads("normalUploads");
    this.set_upload_load_error(undefined);
    this.set_upload(undefined);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setUploadModal", "set_upload_load_error", "set_upload"]),

    ...mapActions(["uploadFile"]),

    reset() {
      this.uploads.forEach(upload => upload.tip = this.defaultFileTip);
    },

    closeUploadModal() {
      this.setUploadModal({ status: false });
    },

    getExt(filename) {
      const tmp = filename.split(".");
      const ext = tmp[tmp.length - 1];
      return ext;
    },

    getUploads(key, type = "normal") {
      return this[key].map(upload => {
        upload.tip = this.defaultFileTip;
        if (type === "normal") {
          upload.valid = this.normalValidTypes;
        }
        return upload;
      });
    },

    formatFileName(name, limit = 31) {
      let str = name;
      if (name.length > limit) {
        str = `${name.slice(0, 13)}...${name.slice(name.length - 15, name.length)}`;
      }
      str = `<span style="font-size: 12px">${str}</span>`;
      return str;
    },

    handleUpload(file, upload) {
      const ext = this.getExt(file.name);
      if (!upload.valid.includes(ext)) {
        upload.tip = `<span style="color: rgb(199, 37, 65)">文件类型 .${ext} 错误!</span>`;
      } else {
        if (this.validCoredumpTypes.includes(this.selectedFileType)) {
          this.selectedFileType = "core";
        } else {
          this.selectedFileType = ext;
        }
        upload.tip = this.formatFileName(file.name);
        upload.file = file;
      }
      return false;
    },

    upload() {
      const uploads = this.uploads;
      let canUpload = true;
      for (const upload of uploads) {
        if (!upload.file) {
          upload.tip = `<span style="color: rgb(199, 37, 65)">${upload.title}不能为空！</span>`;
          canUpload = false;
        }
      }

      if (!canUpload) {
        return;
      }

      const formData = new FormData();
      for (const upload of uploads) {
        formData.append("file", upload.file);
      }

      this.uploadFile({ cancelToken: this.cancelToken.token, fileType: this.selectedFileType, formData });
    }
  },

  computed: {
    ...mapState(["fileTypes", "upload_loading", "upload_load_error", "upload_data"]),

    ...mapGetters(["normalValidTypes"]),

    validCoredumpTypes() {
      let types = [];
      for (const upload of this.coredumpUploads) {
        types = types.concat(upload.valid);
      }
      return types;
    }
  },

  watch: {
    selectedFileType(newVal, oldVal) {
      if (this.uploads.every(upload => !this.getExt(upload.tip).includes(newVal))) {
        this.reset();
      }

      if (newVal !== "core" && oldVal !== "core") {
        return;
      }

      let uploads;
      if (newVal === "core") {
        uploads = this.getUploads("coredumpUploads", "core");
      } else {
        uploads = this.getUploads("normalUploads");
      }
      this.uploads = uploads;
    }
  }
};