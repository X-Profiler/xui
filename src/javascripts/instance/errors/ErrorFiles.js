"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/errors");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getErrorFiles({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getErrorFiles"]),

    ...mapMutations(["set_files_load_error"]),
  },

  computed: {
    ...mapState(["files_data"]),

    errorFiles() {
      return !!this.files_data.length;
    },
  },

  watch: {
    files_data() {
      if (!this.errorFiles) {
        this.set_files_load_error("项目下暂无错误日志信息，请查看您的 xtransit 是否正确配置了 error_logs 错误日志文件路径数组");
        return;
      }
      this.set_files_load_error(undefined);
      this.selectedErrorFile = this.files_data[0].value;
    }
  }
};