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

  mounted() {
    // check file status
    this.checkInterval = setInterval(() => this.handleLoadingFiles(), 1000);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_files({ list: [], count: 0 });
    clearInterval(this.checkInterval);
  },

  methods: {
    ...mapActions(["getFiles", "checkFileStatus"]),

    ...mapMutations(["set_files", "setErrorModal"]),

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
    },

    handleLoadingFiles() {
      const files = this.loadingFiles;
      if (files.length === 0 || this.checkingStatus || this.checkingStatusError) {
        return;
      }

      this.checkingStatus = true;
      const list = files.map(file => {
        return {
          fileId: file.fileId,
          fileType: file.fileType
        }
      });
      this.checkFileStatus({ cancelToken: this.cancelToken.token, files: list })
        .then(data => console.log(data))
        .catch(err => {
          this.checkingStatusError = err.message;
          this.setErrorModal({ status: true, error: { title: "检索状态失败", message: this.checkingStatusError } });
        })
        .then(() => this.checkingStatus = false);

      // test
      // setTimeout(() => {
      //   files.forEach(file => {
      //     file.fileStatus = 3;
      //     const element = this.$refs[`operation::${file.index}`];
      //     element && element.updateOperation();
      //   });
      //   console.log("done");
      // }, 5000);
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

      for (let index = 0; index < list.length; index++) {
        const file = list[index];
        const tmp = {
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
          fileId: file.fileId,
          index
        };

        files.push(tmp);

        // file loading
        if (file.status === 0 || file.status === 2) {
          this.loadingFiles.push(tmp);
        }
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