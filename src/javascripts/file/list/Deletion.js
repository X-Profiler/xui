"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations } = utils.createNamespace("dashboard/file");

export default {
  methods: {
    ...mapMutations(["setDeletionModal"]),

    openDeletionModal() {
      const data = this.row;
      this.setDeletionModal({
        status: true, data: {
          filePath: data.filePath,
          fileId: data.fileId,
          fileType: data.fileType
        }
      });
    }
  }
};