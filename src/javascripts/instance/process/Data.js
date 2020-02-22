"use strict";

import * as moment from "moment";
import { http, tags } from "../../config";
import * as utils from "../../lib/utils";

const { xProcesses } = http;

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    this.getAgentXprocesses();
  },

  mounted() {
    this.line = this.$refs.line;
    this.panel = this.$refs.panel;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    resetXprocesses() {
      this.selectedPid = undefined;
      this.xProcesses = [];
    },

    formatXprocesses(list) {
      return list.map(proc => {
        // add process line color
        const colors = this.colors;
        const hash = Math.abs(utils.hashCode(proc.cmd));
        proc.color = colors[hash % colors.length];

        // format time
        proc.startTimeFormat = moment(proc.startTime).format("YYYY-MM-DD HH:mm:SS");
        proc.updateTimeFormat = moment(proc.updateTime).format("YYYY-MM-DD HH:mm:SS");

        // format cpu & memory usage
        proc.cpuUsageFormat = proc.cpuUsage + "%";
        proc.heapUsageFormat = proc.heapUsage + "%";

        // add line data
        this.line.setLineData(proc);
        return proc;
      });
    },

    setDefaultPid() {
      // set pid from query
      const query = this.$route.query;
      if (query.pid) {
        this.selectedPid = query.pid;
        return;
      }
      // set pid from data
      if (this.xProcesses.length > 0) {
        this.selectedPid = this.xProcesses[0].pid;
      }
    },

    getAgentXprocesses() {
      this.get(xProcesses.msg, xProcesses.url, { appId: this.appId, agentId: this.agentId }, data => {
        const list = data.list;
        if (Array.isArray(list)) {
          this.xProcesses = this.formatXprocesses(list);
          this.setDefaultPid();
        }
      }, this.cancelToken.token, "xProcessesLoading");
    },

    selectPid(index) {
      const data = this.xProcesses[index];
      this.selectedPid = data.pid;
    }
  },

  computed: {
    lineTitle() {
      return utils.getTag(tags.lineTitle);
    }
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "pid", "selectedPid");
    },

    selectedPid(...args) {
      utils.watchQueryKey.call(this, "pid", "selectedPid", args);

      // get line
      let procData;
      for (const data of this.xProcesses) {
        if (data.pid == this.selectedPid) {
          procData = data;
        }
      }
      if (!procData) return;

      // line
      this.line.updateSelectedProcess(procData);

      // panel
      this.panel.updateSelectedProcess(procData);
    },

    agentId() {
      this.resetXprocesses();
      this.getAgentXprocesses();
    }
  }
};