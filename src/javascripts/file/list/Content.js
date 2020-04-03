"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapActions } = utils.createNamespace("dashboard/file");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getFiles"])
  },

  computed: {
    ...mapState(["filterType", "files_data"]),

    ...mapGetters(["getLabelByType"]),

    files() {
      const files = [];
      const data = this.files_data;
      if (!Array.isArray(data)) {
        return files;
      }

      for (const d of data) {
        files.push({
          typeLabel: this.getLabelByType(d.fileType)
        });
      }

      return files;
    }
  },

  watch: {
    filterType() {
      this.getFiles({
        cancelToken: this.cancelToken.token,
        filterType: this.filterType,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    }
  }
}