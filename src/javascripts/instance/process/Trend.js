"use strict";

import * as utils from "../../lib/utils";

const { mapState: mapStateProcess } = utils.createNamespace("dashboard/instance/process");

export default {
  methods: {
    mouseover(bt) {
      bt.ghost = false;
      const style = this.$refs[bt.value][0].style;
      style["font-weight"] = "bold";
      style["color"] = this.color;
      style["font-style"] = "italic";
    },

    mouseout(bt) {
      bt.ghost = true;
      const style = this.$refs[bt.value][0].style;
      style["font-weight"] = "normal";
      style["color"] = "#fff";
      style["font-style"] = "normal";
    },

    showTip(refs, data) {
      for (const ref of refs) {
        const element = this.$refs[ref][0];
        element && element.showTip(data);
      }
    },

    hiddenTip(refs) {
      for (const ref of refs) {
        this.$refs[ref][0].hiddenTip();
      }
    },

    linkage(data) {
      this.showTip(this.chartRefs, data);
    },

    hidden() {
      this.hiddenTip(this.chartRefs);
    }
  },

  computed: {
    ...mapStateProcess(["colors", "processTrendData",
      "xprofiler_processes_loading", "xprofiler_processes_load_error", "xprofiler_processes_data"]),

    cmdMap() {
      return Array.from(new Set(this.xprofiler_processes_data.map(proc => proc.cmd)));
    },

    proc() {
      const pid = this.processTrendData.pid;
      return this.xprofiler_processes_data.filter(proc => Number(proc.pid) === Number(pid))[0];
    },

    color() {
      const colors = this.colors;
      const proc = this.proc;
      const index = this.cmdMap.indexOf(proc.cmd);
      return colors[index % colors.length] || colors[0];
    },

    chartRefs() {
      const refs = [];
      for (const charts of this.chartGroup) {
        for (const { value } of charts) {
          refs.push(value);
        }
      }
      return refs;
    }
  }
};