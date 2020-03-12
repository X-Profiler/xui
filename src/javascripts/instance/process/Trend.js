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

    showTip(refs, time) {
      for (const ref of refs) {
        this.$refs[ref][0].showTip(time);
      }
    },

    hiddenTip(refs) {
      for (const ref of refs) {
        this.$refs[ref][0].hiddenTip();
      }
    },

    linkage(time) {
      this.showTip(this.dts1.map(item => item.value), time);
    },

    hidden() {
      this.hiddenTip(this.dts1.map(item => item.value));
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
    }
  }
};