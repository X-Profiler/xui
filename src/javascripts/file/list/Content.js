"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapActions } = utils.createNamespace("dashboard/file");

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
    ...mapState(["filterType", "files_data"])
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