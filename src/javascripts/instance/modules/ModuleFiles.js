"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateInstance } = utils.createNamespace("dashboard/instance");
const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/modules");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getModuleFiles({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    this.reset();
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getModuleFiles"]),

    ...mapMutations(["set_files_load_error", "setModuleFile"]),

    reset() {
      this.set_files_load_error(undefined);
      this.setModuleFile(undefined);
      this.selectedModuleFile = undefined;
    }
  },

  computed: {
    ...mapState(["files_data"]),

    ...mapStateInstance(["agentId"]),

    moduleFiles() {
      return !!this.files_data.length;
    },
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "file", "selectedModuleFile");
    },

    files_data() {
      if (!this.moduleFiles) {
        this.set_files_load_error("项目下暂无模块信息，请查看您的 xtransit 是否正确配置了 packages 模块文件路径数组");
        return;
      }
      this.set_files_load_error(undefined);
      const query = this.$route.query;
      const validFiles = this.files_data.map(file => file.value);
      this.valueWhiteList.selectedModuleFile = validFiles;
      if (query.file && validFiles.includes(query.file)) {
        this.selectedModuleFile = decodeURIComponent(query.file);
      } else {
        this.selectedModuleFile = this.files_data[0].value;
      }
    },

    selectedModuleFile(...args) {
      const [newValue, oldValue] = args;
      if (oldValue && newValue && oldValue !== newValue) {
        this.setModuleFile(undefined);
      }
      setTimeout(() => this.setModuleFile(this.selectedModuleFile), 0);

      if (!this.selectedModuleFile) {
        return;
      }

      utils.watchQueryKey.call(this, "file", "selectedModuleFile", args);
    },

    agentId() {
      this.reset();
      this.getModuleFiles({ cancelToken: this.cancelToken.token });
    }
  }
};