"use strict";

import * as utils from "@/javascripts/lib/utils";
const { mapState, mapMutations } = utils.createNamespace("dashboard/instance/modules");

const severityMap = {
  critical: 0,
  high: 1,
  moderate: 2,
  low: 3
};

const severityNameMap = {
  critical: "极危",
  high: "高危",
  moderate: "中危",
  low: "低危"
};

export default {
  methods: {
    ...mapMutations(["setRiskDetailModal"]),

    closeRiskModal() {
      this.setRiskDetailModal({ status: false });
    }
  },

  computed: {
    ...mapState(["riskModalData", "riskModules"]),

    risks() {
      const risks = [];
      if (!this.riskModalData || !this.riskModules) {
        return risks;
      }
      const data = this.riskModules[this.riskModalData.name];
      if (!data) {
        return risks;
      }

      data.sort((o, n) => severityMap[o.severity] > severityMap[n.severity] ? 1 : -1);

      for (const d of data) {
        risks.push({
          url: d.url,
          name: d.name,
          version: d.currentVersions,
          path: d.path,
          vulnerableVersions: d.vulnerable_versions,
          fixCmd: d.cmd,
          level: severityNameMap[d.severity]
        });
      }

      return risks;
    }
  }
};