"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/file");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setDeletionModal", "setFilterType"]),

    ...mapActions(["deleteFile"]),

    closeDeletionModal() {
      this.setDeletionModal({ status: false });
      if (this.success && !this.error) {
        setTimeout(() => {
          this.setFilterType(undefined);
          setTimeout(() => this.setFilterType(this.$route.query.filterType), 0);
        }, 0);
      }
    },

    submitFileDeletion() {
      const { fileId, fileType } = this.deletionData;
      this.loading = true;
      this.deleteFile({ cancelToken: this.cancelToken.token, fileId, fileType })
        .then(() => this.success = true)
        .catch(err => this.error = err.message)
        .then(() => this.loading = false);
    }
  },

  computed: {
    ...mapState(["deletionData"])
  }
};