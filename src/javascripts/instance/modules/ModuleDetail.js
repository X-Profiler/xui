"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/modules");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "riskDetailModal", "riskDetail", "setRiskDetailModal");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getModule({ cancelToken: this.cancelToken.token });
  },

  mounted() {
    handleMounted.call(this, "handleRiskDetailModal");
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_module_load_error(undefined);
  },

  methods: {
    ...mapMutations(["set_module_load_error", "setRiskDetailModal"]),

    ...mapActions(["getModule"]),

    ...mapMethods("handleRiskDetailModal"),

    checkSeverity(name, level) {
      const riskModules = this.riskModules;
      if (!riskModules || !riskModules[name]) {
        return false;
      }
      return riskModules[name].some(info => info.severity === level);
    },

    openRiskModal(row) {
      this.setRiskDetailModal({ status: true, riskModalData: row });
    },

    closeRiskModal() {
      this.setRiskDetailModal({ status: false });
    }
  },

  computed: {
    ...mapState(["module_loading", "module_load_error", "module_data",
      "showDependencies", "riskModules", "riskDetailModal"]),

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
        if (!this.riskModules) {
          riskData.risk = undefined;
          riskData.level = "-";
        } else if (this.checkSeverity(name, "critical")) {
          riskData.risk = true;
          riskData.level = "极危";
          riskData.color = "#e33900";
        } else if (this.checkSeverity(name, "high")) {
          riskData.risk = true;
          riskData.level = "高危";
          riskData.color = "#e33900";
        } else if (this.checkSeverity(name, "moderate")) {
          riskData.risk = true;
          riskData.level = "中危";
          riskData.color = "#f89501";
        } else if (this.checkSeverity(name, "low")) {
          riskData.risk = true;
          riskData.level = "低危";
          riskData.color = "#2376b7";
        } else {
          riskData.risk = false;
        }

        modules.push({
          name, version,
          lockVersion: lock[name] && lock[name].version || "-",
          resolved: lock[name] && lock[name].resolved,
          ...riskData
        });
      }

      return modules;
    }
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleRiskDetailModal(to.query);
    }
  }
};