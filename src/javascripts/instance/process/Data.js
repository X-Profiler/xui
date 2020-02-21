"use strict";

import { http } from "../../config";
import * as utils from "../../lib/utils";

const { xProcesses } = http;

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    this.getAgentXProcesses();
  },

  mounted() {
    this.line = this.$refs.line;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    formatXprocesses(list) {
      return list.map(proc => {
        // add process line color
        const colors = this.colors;
        const hash = Math.abs(utils.hashCode(proc.cmd));
        proc.color = colors[hash % colors.length];

        // add line data
        this.line.setLineData(proc);
        return proc;
      });
    },

    setDefaultPid() {
      if (this.xProcesses.length > 0) {
        this.selectedPid = this.xProcesses[0].pid;
      }
    },

    getAgentXProcesses() {
      this.get(xProcesses.msg, xProcesses.url, { appId: this.appId, agentId: this.agentId }, data => {
        const list = data.list;
        if (Array.isArray(list)) {
          this.xProcesses = this.formatXprocesses(list);
          this.setDefaultPid();
        }
      }, this.cancelToken.token, "xProcessesLoading");
    },

    selectPid(index) {
      const lineData = this.xProcesses[index];
      this.selectedPid = lineData.pid;
    }
  },

  watch: {
    selectedPid() {
      let lineData;
      for (const data of this.xProcesses) {
        if (data.pid === this.selectedPid) {
          lineData = data;
        }
      }
      if (!lineData) return;

      // line
      this.line.updateSelectedProcess(lineData);
    },
  }
};