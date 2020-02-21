"use strict";

import { http } from "../../config";
import * as utils from "../../lib/utils";
import * as moment from "moment";

const { xProcesses } = http;
const colors = [
  "rgb(42, 125, 194)",
  "rgb(41, 145, 65)",
  "rgb(55, 189, 94)",
  "rgb(47, 149, 176)",
  "rgb(57, 175, 209)",
  "rgb(215, 124, 0)",
  "rgb(248, 152, 0)",
  "rgb(137, 130, 113)",
  "#rgb(169, 159, 141)",
];

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

    getSelectedXProcess() {
      for (const lineData of this.xProcesses) {
        if (lineData.pid === this.selectedPid) {
          return lineData;
        }
      }
      return undefined;
    },

    selectPid(index) {
      const lineData = this.xProcesses[index];
      this.selectedPid = lineData.pid;
    }
  },

  computed: {
    activeXProcess() {
      const lineData = this.getSelectedXProcess();
      if (!lineData) {
        return { pid: "未知", cmd: "未知" };
      }
      return {
        pid: lineData.pid,
        cmd: lineData.cmd,
        startTime: moment(lineData.startTime).format("YYYY-MM-DD HH:mm:SS"),
        updateTime: moment(lineData.updateTime).format("YYYY-MM-DD HH:mm:SS"),
        color: lineData.color
      };
    }
  },

  watch: {
    selectedPid() {
      const lineData = this.getSelectedXProcess();
      if (!lineData) return;

      // line
      this.line.updateSelectedLine(lineData);
    },
  }
};