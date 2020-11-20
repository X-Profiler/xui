"use strict";

import * as moment from "moment";
import { tags } from "@/javascripts/config";
import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateDashboard } = utils.createNamespace("dashboard");
const { mapState: mapStateInstance } = utils.createNamespace("dashboard/instance");
const { mapState: mapStateProcess, mapActions: mapActionsProcess } = utils.createNamespace("dashboard/instance/process");

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();

    this.getXprofilerProcesses(this.cancelToken.token);
  },

  mounted() {
    this.line = this.$refs.line;
    this.panel = this.$refs.panel;
    this.catalogue = this.$refs.catalogue;
    this.scatter = this.$refs.scatter;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActionsProcess(["getXprofilerProcesses"]),

    resetXprocesses() {
      this.globalProcessTip = undefined;
      this.selectedPid = undefined;
      this.xProcesses = [];
      this.onlyAlived = true;
    },

    formatXprocesses(list) {
      const cmdMap = Array.from(new Set(list.map(proc => proc.cmd)));

      return list.map(proc => {
        proc = Object.assign({}, proc);

        // add process line color
        const colors = this.colors;
        const index = cmdMap.indexOf(proc.cmd);
        proc.color = proc.cmd ? colors[index % colors.length] : this.diedProcessColor;
        proc.selected = false;
        proc.historical = !proc.cmd;
        proc.cmd = proc.cmd || "unknown command";

        // format time
        proc.startTimeFmt = moment(proc.startTime).format("YYYY-MM-DD HH:mm:ss");
        proc.updateTimeFmt = moment(proc.updateTime).format("YYYY-MM-DD HH:mm:ss");

        // format cpu, gc & memory usage
        proc.cpuUsageFmt = proc.cpuUsage + "%";
        proc.heapUsageFmt = proc.heapUsage + "%";
        proc.gcUsageFmt = proc.gcUsage + "%";
        proc.rssFmt = utils.formatSize(proc.rss, 1);

        // add line data
        this.line.setLineData(proc);

        // add scatter data
        this.scatter.setScatterData(proc);

        return proc;
      });
    },

    setDefaultPid() {
      // set pid from query
      const query = this.$route.query;
      const queryPid = utils.isNumber(query.pid) && Number(query.pid);
      const vaidPids = this.showedProcesses.map(proc => Number(proc.pid));
      if (queryPid && vaidPids.includes(queryPid)) {
        this.selectedPid = queryPid;
        return;
      }
      // set pid from data
      if (this.showedProcesses.length > 0) {
        this.selectedPid = this.showedProcesses[0].pid;
      }
    },

    selectPid(index) {
      const data = this.showedProcesses[index];
      this.selectedPid = data.pid;
    },

    dispatchProc() {
      // get line
      let procData;
      for (const data of this.showedProcesses) {
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
    }
  },

  computed: {
    ...mapStateDashboard(["appId"]),

    ...mapStateInstance(["agentId"]),

    ...mapStateProcess(["colors", "diedProcessColor", "xprofiler_processes_loading", "xprofiler_processes_load_error", "xprofiler_processes_data"]),

    lineTitle() {
      return utils.getTag(tags.lineTitle);
    },

    globalProcessTip() {
      if (this.xprofiler_processes_loading || this.xprofiler_processes_load_error) {
        return;
      }

      const showedProcesses = this.showedProcesses;
      const nodeProcesses = this.nodeProcesses;
      if (showedProcesses.length === 0 && nodeProcesses.length === 0) {
        return "无法连接到此实例，请确认此实例上的应用已安装并启动了 xtransit，且已正确配置 appid 和 secret";
      }
    },

    display() {
      return !this.xprofiler_processes_loading && !this.xprofiler_processes_load_error && !this.globalProcessTip;
    },

    showedProcesses() {
      return this.onlyAlived ? this.xProcesses.filter(proc => !proc.historical) : this.xProcesses;
    }
  },

  watch: {
    $route(...args) {
      if (this.selectedPid) {
        utils.watchRoute.call(this, args, "pid", "selectedPid");
      }
    },

    selectedPid(...args) {
      if (!this.selectedPid) {
        return;
      }

      utils.watchQueryKey.call(this, "pid", "selectedPid", args);

      this.dispatchProc();

    },

    agentId() {
      this.resetXprocesses();
      this.getXprofilerProcesses(this.cancelToken.token);
    },

    xprofiler_processes_data() {
      this.nodeProcesses = [];
      const { list, nodes } = this.xprofiler_processes_data;

      if (Array.isArray(nodes) && nodes.length) {
        this.nodeProcesses = nodes;
        return;
      }

      if (!Array.isArray(list) || !list.length) {
        return;
      }

      this.xProcesses = this.formatXprocesses(list);
      this.setDefaultPid();
      // this.dispatchProc();
    }
  }
};