"use strict";

import { http } from "../config";
import * as utils from "../lib/utils";
import * as moment from "moment";

const { xProcesses } = http;

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    this.setLastTime();
    this.getAgentXProcesses();
  },

  methods: {
    setDefaultPid() {
      if (this.xProcesses.length > 0) {
        this.selectedPid = this.xProcesses[0].pid;
      }
    },

    getAgentXProcesses() {
      this.get(xProcesses.msg, xProcesses.url, { appId: this.appId, agentId: this.agentId }, data => {
        const list = data.list;
        if (Array.isArray(list)) {
          this.xProcesses = list;
          this.setDefaultPid();
        }
      }, this.cancelToken.token);
    },

    setLastTime() {
      const list = [];
      const today = moment().day();
      for (let i = 0; i < 24; i += 3) {
        const time = moment().subtract(i, "hours");
        const hour = time.hours();
        if (time.day() !== today && hour === 23) {
          list.push({ label: time.format("MM.DD"), value: week[time.day()] });
        } else {
          list.push({ label: hour < 12 ? "AM" : "PM", value: hour });
        }
      }
      this.times = list;
    }
  }
};