"use strict";

import { http } from "../../config";
import * as utils from "../../lib/utils";
import * as moment from "moment";

const { xProcesses } = http;

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

    this.setLastTime();
    this.getAgentXProcesses();
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
        proc.selectedStyle = "";
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

    setLastTime() {
      const list = [];
      const today = moment().day();
      for (let i = 0; i < 24; i += 2) {
        const time = moment().subtract(i, "hours");
        const hour = time.hours();
        if (time.day() !== today && hour === 23) {
          list.push({ label: time.format("MM.DD"), value: week[time.day()] });
        } else {
          list.push({ label: hour < 12 ? "AM" : "PM", value: hour });
        }
      }
      this.times = list;
    },

    getProcessLineStyle(index) {
      const oneDay = 24 * 60 * 60 * 1000;
      const end = Date.now();
      const start = Date.now() - oneDay;
      const lineData = this.xProcesses[index];

      // add color
      let style = "background-color: " + lineData.color + ";";

      // add width
      style += "width: " + (lineData.updateTime - lineData.startTime) / oneDay * 100 + "%;";

      // margin-left
      if (lineData.startTime > start) {
        style += "margin-left:" + (lineData.startTime - start) / oneDay * 100 + "%;";
      }

      // margin-right
      if (end - lineData.updateTime > 2 * 60 * 1000) {
        style += "margin-right:" + (end - lineData.updateTime) / oneDay * 100 + "%;";
      }

      return style;
    },

    getSelectedXProcess() {
      for (const lineData of this.xProcesses) {
        if (lineData.pid === this.selectedPid) {
          return lineData;
        }
      }
      return undefined;
    },

    resetSelectedStyle() {
      for (const lineData of this.xProcesses) {
        lineData.selectedStyle = "";
      }
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
      // add box shadow
      this.resetSelectedStyle();
      lineData.selectedStyle = `box-shadow: 0 0 0 2px ${lineData.color.replace(")", ", 0.4)")};-webkit-transform: scaleY(1.3);transform: scaleY(1.3);`
    },
  }
};