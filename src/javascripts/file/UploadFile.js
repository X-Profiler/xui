"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState, mapGetters, mapMutations } = utils.createNamespace("dashboard/file");

export default {
  methods: {
    ...mapMutations(["setUploadModal"]),

    reset() {
      this.uploads.forEach(upload => upload.tip = this.defaultFileTip);
    },

    closeUploadModal() {
      this.setUploadModal({ status: false });
    },

    getExt(filename) {
      const tmp = filename.split('.');
      const ext = tmp[tmp.length - 1];
      return ext;
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
      if (!this.validTypes.includes(ext)) {
        upload.tip = `<span style="color: rgb(199, 37, 65)">文件类型 .${ext} 错误!</span>`;
      } else {
        this.selectedFileType = ext;
        upload.tip = this.formatFileName(file.name);
      }
      return false;
    },

    uploadFile() {

    }
  },

  computed: {
    ...mapState(["fileTypes"]),

    ...mapGetters(["validTypes"]),

    uploads() {
      return this.normalUploads
    }
  },

  watch: {
    selectedFileType() {
      if (this.uploads.some(upload => this.getExt(upload.tip).includes(this.selectedFileType))) {
        return;
      }
      this.reset();
    }
  }
};