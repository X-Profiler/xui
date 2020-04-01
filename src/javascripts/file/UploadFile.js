"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState, mapGetters, mapMutations } = utils.createNamespace("dashboard/file");

export default {
  methods: {
    ...mapMutations(["setUploadModal"]),

    closeUploadModal() {
      this.setUploadModal({ status: false });
    },

    handleUpload(file) {
      const tmp = file.name.split('.');
      const ext = tmp[tmp.length - 1];
      if (!this.validTypes.includes(ext)) {
        this.selectedFileName = `<span style="color: rgb(199, 37, 65)">文件类型 .${ext} 错误!</span>`;
      } else {
        this.selectedFileName = file.name;
        this.selectedFileType = ext;
      }
      return false;
    },

    uploadFile() {

    }
  },

  computed: {
    ...mapState(["fileTypes"]),

    ...mapGetters(["validTypes"])
  }
};