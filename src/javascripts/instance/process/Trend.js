"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateProcess, mapMutations: mapMutationsProcess } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    if (this.trendMap) {
      this.durationGroup = [];
    }
  },

  methods: {
    ...mapMutationsProcess(["setTakeActionModal"]),

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

    takeAction(bt) {
      this.setTakeActionModal({ status: true, actionData: { pid: this.proc.pid, action: bt.value } });
    },

    showTip(refs, data) {
      for (const ref of refs) {
        const element = this.$refs[ref][0];
        element && element.showTip(data);
      }
    },

    handleBroadcase(refs, data) {
      for (const ref of refs) {
        const element = this.$refs[ref][0];
        element && element.handleBroadcase(data);
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

    broadcast(data) {
      this.handleBroadcase(this.chartRefs, data);
    },

    hidden() {
      this.hiddenTip(this.chartRefs);
    }
  },

  computed: {
    ...mapStateProcess(["colors", "processTrendData",
      "xprofiler_processes_loading", "xprofiler_processes_load_error", "xprofiler_processes_data"]),

    cmdMap() {
      const { list } = this.xprofiler_processes_data;
      return Array.from(new Set(list.map(proc => proc.cmd)));
    },

    proc() {
      const pid = this.processTrendData.pid;
      const { list } = this.xprofiler_processes_data;
      return list.filter(proc => Number(proc.pid) === Number(pid))[0];
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