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

    ...mapMutations(["set_files_load_error", "setModuleFile", "setShowDependencies"]),

    reset() {
      this.set_files_load_error(undefined);
      this.setModuleFile(undefined);
      this.selectedModuleFile = undefined;
    },

    formatRisk(count, color) {
      return `<code style="color: ${color};">${count}</code>`;
    },

    setRiskTip(risk, color) {
      const list = [];
      if (risk.critical) {
        list.push(`${this.formatRisk(risk.critical, color)} 个极危漏洞`);
      }
      if (risk.high) {
        list.push(`${this.formatRisk(risk.high, color)} 个高危漏洞`);
      }
      if (risk.moderate) {
        list.push(`${this.formatRisk(risk.moderate, color)} 个中危漏洞`);
      }
      if (risk.low) {
        list.push(`${this.formatRisk(risk.low, color)} 个低危漏洞`);
      }
      return `发现 ${list.join("，")}`;
    },

    changeDevType(dependencies) {
      this.dependencies = dependencies;
    }
  },

  computed: {
    ...mapState(["files_data"]),

    ...mapStateInstance(["agentId"]),

    moduleFiles() {
      return !!this.files_data.length;
    },

    riskTip() {
      const riskTip = {};
      const data = this.files_data.filter(d => d.value === this.selectedModuleFile);
      if (!data.length) {
        return riskTip;
      }
      const risk = data[0].risk;
      const vulnerabilities = risk.vulnerabilities || {};
      const tipPrefix = "当前项目引入的 Npm 模块";
      const tipSuffix = `（扫描 <code>${risk.totalDependencies}</code> 个模块于 <code>${risk.scanTime}</code>）`;

      // alert type
      if (vulnerabilities.critical || vulnerabilities.high) {
        riskTip.alertType = "error";
        riskTip.iconType = "ios-close-circle-outline";
        riskTip.color = "rgb(199, 37, 65)";
        riskTip.tip = this.setRiskTip(risk.vulnerabilities, riskTip.color);
      } else if (vulnerabilities.moderate) {
        riskTip.alertType = "warning";
        riskTip.iconType = "ios-alert-outline";
        riskTip.color = "rgb(255, 186, 36)";
        riskTip.tip = this.setRiskTip(risk.vulnerabilities, riskTip.color);
      } else if (vulnerabilities.low) {
        riskTip.alertType = "info";
        riskTip.iconType = "ios-alert-outline";
        riskTip.color = "rgb(33, 150, 243)";
        riskTip.tip = this.setRiskTip(risk.vulnerabilities, riskTip.color);
      } else {
        riskTip.alertType = "success";
        riskTip.iconType = "ios-checkmark-circle-outline";
        riskTip.color = "rgb(25, 190, 107)";
        riskTip.tip = "不存在安全风险";
      }

      riskTip.tip = `${tipPrefix}${riskTip.tip}${tipSuffix}`;

      return riskTip;
    }
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "file", "selectedModuleFile");
      utils.watchRoute.call(this, args, "dependencies", "dependencies");
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

      const query = this.$route.query;
      if (utils.isBooleanString(query.dependencies)) {
        this.dependencies = utils.stringToBoolean(query.dependencies);
      } else {
        this.dependencies = true;
      }
    },

    dependencies(...args) {
      this.setShowDependencies(this.dependencies);
      utils.watchQueryKey.call(this, "dependencies", "dependencies", args);
    },

    agentId() {
      this.reset();
      this.getModuleFiles({ cancelToken: this.cancelToken.token });
    }
  }
};