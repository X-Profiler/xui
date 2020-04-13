"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapMutations, mapActions } = utils.createNamespace("dashboard/file");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.cancelToken2 = utils.createCancelToken();
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
    utils.cancelRequest(this.cancelToken2);
    this.set_files({ list: [], count: 0 });
    clearInterval(this.checkInterval);
  },

  methods: {
    ...mapActions(["getFiles", "checkFileStatus"]),

    ...mapMutations(["set_files", "setErrorModal"]),

    resetFileStatusCheck() {
      utils.cancelRequest(this.cancelToken2);
      clearInterval(this.checkInterval);
      this.loadingFiles = [];
      this.checkingStatus = false;
      this.cancelToken2 = utils.createCancelToken();
      this.checkInterval = setInterval(() => this.handleLoadingFiles(), 1000);
    },

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

    addLoadingFile(file) {
      this.loadingFiles.push(file);
      this.checkingStatusError = undefined;
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
          fileType: file.fileType,
          status: file.fileStatus,
          index: file.index
        };
      });
      this.checkFileStatus({ cancelToken: this.cancelToken2.token, files: list })
        .then(({ list }) => {
          if (!Array.isArray(list)) {
            return;
          }
          for (const res of list) {
            let file = files.filter(file => file.index === res.index);
            if (!file.length) {
              continue;
            }
            file = file[0];
            file.fileStatus = res.status;
            const element = this.$refs[`operation::${res.index}`];
            element && element.updateOperation();
            const loadingIndex = files.indexOf(file);
            files.splice(loadingIndex, 1);
          }
        })
        .catch(err => {
          this.checkingStatusError = err.message;
          this.setErrorModal({ status: true, error: { title: "状态检索失败", message: this.checkingStatusError } });
          files.forEach(file => {
            let status = file.fileStatus;
            if (status === 0) {
              status = 998;
            }
            if (status === 2) {
              status = 999;
            }
            file.fileStatus = status;
            const element = this.$refs[`operation::${file.index}`];
            element && element.updateOperation();
          });
          this.loadingFiles = [];
        })
        .then(() => this.checkingStatus = false);
    }
  },

  computed: {
    ...mapState(["nessaryQueryArgs", "filterType",
      "files_loading", "files_load_error", "files_data"]),

    ...mapGetters(["getIconByType", "getLabelByType"]),

    files() {
      const files = [];
      const { list, count } = this.files_data;
      if (!Array.isArray(list) || !list.length) {
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
          fileBasename: file.basename,
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
      this.resetFileStatusCheck();

      utils.watchQueryKey.call(this, "page", "currentPage", args);
    }
  }
};