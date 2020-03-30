"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateInstance } = utils.createNamespace("dashboard/instance");
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/errors");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getErrorFiles({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    this.reset();
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getErrorFiles"]),

    ...mapMutations(["set_files_load_error", "setErrorFile"]),

    reset() {
      this.set_files_load_error(undefined);
      this.setErrorFile(undefined);
      this.selectedErrorFile = undefined;
    }
  },

  computed: {
    ...mapState(["files_data"]),

    ...mapStateInstance(["agentId"]),

    errorFiles() {
      return !!this.files_data.length;
    },
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "file", "selectedErrorFile");
    },

    files_data() {
      if (!this.errorFiles) {
        this.set_files_load_error("项目下暂无错误日志信息，请查看您的 xtransit 是否正确配置了 error_logs 错误日志文件路径数组");
        return;
      }
      this.set_files_load_error(undefined);
      const query = this.$route.query;
      const validFiles = this.files_data.map(file => file.value);
      this.valueWhiteList.selectedErrorFile = validFiles;
      if (query.file && validFiles.includes(query.file)) {
        this.selectedErrorFile = decodeURIComponent(query.file);
      } else {
        this.selectedErrorFile = this.files_data[0].value;
      }
    },

    selectedErrorFile(...args) {
      const [newValue, oldValue] = args;
      if (oldValue && newValue && oldValue !== newValue) {
        this.setErrorFile(undefined);
      }
      setTimeout(() => this.setErrorFile(this.selectedErrorFile), 0);

      if (!this.selectedErrorFile) {
        return;
      }

      utils.watchQueryKey.call(this, "file", "selectedErrorFile", args);
    },

    agentId() {
      this.reset();
      this.getErrorFiles({ cancelToken: this.cancelToken.token });
    }
  }
};