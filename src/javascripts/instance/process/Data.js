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
    this.catalogue = this.$refs.catalogue;
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
      const cmdMap = Array.from(new Set(list.map(proc => proc.cmd)));

      return list.map(proc => {
        // add process line color
        const colors = this.colors;
        const index = cmdMap.indexOf(proc.cmd);
        proc.color = colors[index % colors.length];
        proc.selected = false;

        // format time
        proc.startTimeFmt = moment(proc.startTime).format("YYYY-MM-DD HH:mm:SS");
        proc.updateTimeFmt = moment(proc.updateTime).format("YYYY-MM-DD HH:mm:SS");

        // format cpu, gc & memory usage
        proc.cpuUsageFmt = proc.cpuUsage + "%";
        proc.heapUsageFmt = proc.heapUsage + "%";
        proc.gcUsageFmt = proc.gcUsage + "%";
        proc.rssFmt = utils.formatSize(proc.rss, 1);

        // add scatter data
        proc.HEAP = Number(proc.heapUsage);
        proc.CPU = Number(proc.cpuUsage);
        proc.GC = Number(proc.gcUsage);
        proc.RSS = Math.round((proc.rss / 1024 / 1024));

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

      // catalogue
      this.catalogue.updateSelectedProcess(procData);
    },

    agentId() {
      this.resetXprocesses();
      this.getAgentXprocesses();
    }
  }
};