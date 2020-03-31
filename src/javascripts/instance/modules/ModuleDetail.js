"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/modules");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getModule({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_module_load_error(undefined);
  },

  methods: {
    ...mapMutations(["set_module_load_error"]),

    ...mapActions(["getModule"]),

    checkSeverity(name, level) {
      const riskModules = this.riskModules;
      if (!riskModules[name]) {
        return false;
      }
      return riskModules[name].some(info => info.severity === level);
    }
  },

  computed: {
    ...mapState(["module_loading", "module_load_error", "module_data", "showDependencies", "riskModules"]),

    modules() {
      const modules = [];
      const showDependencies = this.showDependencies;
      let data = this.module_data || {};
      if (!data.dependencies || !data.devDependencies) {
        return modules;
      }
      const lock = data.lockModule || {};
      data = showDependencies ? data.dependencies : data.devDependencies;

      // risks
      for (const [name, version] of Object.entries(data)) {
        const riskData = {};
        if (this.checkSeverity(name, "critical")) {
          riskData.risk = true;
          riskData.level = "极危"
          riskData.color = "rgb(199, 37, 65)"
        } else if (this.checkSeverity(name, "high")) {
          riskData.risk = true;
          riskData.level = "高危"
          riskData.color = "rgb(199, 37, 65)"
        } else if (this.checkSeverity(name, "moderate")) {
          riskData.risk = true;
          riskData.level = "中危"
          riskData.color = "rgb(255, 186, 36)"
        } else if (this.checkSeverity(name, "low")) {
          riskData.risk = true;
          riskData.level = "低危";
          riskData.color = "rgb(33, 150, 243)"
        } else {
          riskData.risk = false;
        }

        modules.push({
          name, version,
          lockVersion: lock[name] && lock[name].version || '-',
          resolved: lock[name] && lock[name].resolved,
          ...riskData
        });
      }

      return modules;
    }
  }
};