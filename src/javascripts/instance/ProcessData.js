"use strict";

import { http } from "../config";
import * as utils from "../lib/utils";
import * as moment from "moment";

const { xProcesses } = http;

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const colors = [
  "#2a7dc2",
  "#299141",
  "#37bd5e",
  "#2f95b0",
  "#39afd1",
  "#d77c00",
  "#f89800",
  "#898271",
  "#a99f8d",
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
    }
  },

  computed: {
    activeXProcess() {
      for (const lineData of this.xProcesses) {
        if (lineData.pid === this.selectedPid) {
          return {
            pid: lineData.pid,
            cmd: lineData.cmd,
            startTime: moment(lineData.startTime).format("YYYY-MM-DD HH:mm:SS"),
            updateTime: moment(lineData.updateTime).format("YYYY-MM-DD HH:mm:SS"),
            color: lineData.color
          };
        }
      }

      return { pid: "未知", cmd: "未知" };
    }
  }
};