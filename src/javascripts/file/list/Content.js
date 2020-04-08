"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapMutations, mapActions } = utils.createNamespace("dashboard/file");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    const query = this.$route.query;
    if (query.page) {
      this.currentPage = Number(query.page);
    } else {
      this.currentPage = 1;
    }
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_files({ list: [], count: 0 });
  },

  methods: {
    ...mapActions(["getFiles"]),

    ...mapMutations(["set_files"]),

    changeFilePage(page) {
      this.currentPage = page;
    },

    refreshFiles(filterType, currentPage) {
      this.getFiles({
        cancelToken: this.cancelToken.token,
        filterType: filterType || this.filterType,
        currentPage: currentPage || this.currentPage,
        pageSize: this.pageSize
      });
    }
  },

  computed: {
    ...mapState(["nessaryQueryArgs", "filterType",
      "files_loading", "files_load_error", "files_data"]),

    ...mapGetters(["getIconByType", "getLabelByType"]),

    files() {
      const files = [];
      const { list, count } = this.files_data;
      if (!Array.isArray(list)) {
        return files;
      }

      if (utils.isNumber(count)) {
        this.totaFileCount = count;
      }

      for (const file of list) {
        files.push({
          typeIcon: this.getIconByType(file.fileType),
          typeLabel: this.getLabelByType(file.fileType),
          filePath: file.file || file.coreFile,
          executable: file.executableFile,
          fileCreator: file.creator,
          createTime: file.time,
          createAgent: file.agent,
          fileStatus: file.status,
          fileFavor: file.favor,
          fileType: file.fileType,
          fileId: file.fileId
        });
      }

      return files;
    }
  },

  watch: {
    totaFileCount() {
      if (!this.totaFileCount) {
        return;
      }
      const maxPage = Math.ceil(this.totaFileCount / this.pageSize);
      if (this.currentPage > maxPage) {
        this.currentPage = maxPage;
      }
    },

    $route(...args) {
      utils.watchRoute.call(this, args, "page", "currentPage");
    },

    currentPage(...args) {
      if (!this.currentPage) {
        return;
      }

      this.refreshFiles();

      utils.watchQueryKey.call(this, "page", "currentPage", args);
    }
  }
};