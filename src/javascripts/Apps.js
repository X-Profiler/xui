"use strict";

import { http } from "./lib/Config";
import * as utils from "./lib/Utils";

const { apps } = http;

// title metric key
const INSTANCE_COUNT = "instanceCount";
const ALARM_COUNT = "alarmCount";
const RISK_COUNT = "riskCount";

// main metric key
const PROCESS_CPU_USAGE = "processCpuUsage";
const PROCESS_MEMORY_USAGE = "processMemoryUsage";
const SYSTEM_CPU_USAGE = "systemCpuUsage";
const SYSTEM_MEMORY_USAGE = "systemMemoryUsage";
const DISK_USAGE = "diskUsage";

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    // get apps
    this.getApps();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    reset() {
      this.apps = [];
    },

    formatCount(count) {
      let res = count;
      if (count > 9999) {
        res = (res / 1000).toFixed(1) + "K";
      }
      return res;
    },

    randomColor(index) {
      const length = this.colors.length;
      let color = this.colors[index % length];
      return color;
    },

    getInstanceStyle(instance) {
      let style = 'color: ';
      if (instance.status === 0) {
        style += '#c5c8ce';
      } else if (instance.status === 1) {
        style += '#2a9446';
      } else if (instance.status == 2) {
        style += '#db7c00';
      } else {
        style += '#e33900';
      }
      return style;
    },

    handleApps(apps) {
      const appIds = [];
      for (const app of apps) {
        appIds.push(app.appId);
        // title metric
        app[INSTANCE_COUNT] = 0;
        app[`${INSTANCE_COUNT}Loading`] = true;
        app[ALARM_COUNT] = 0;
        app[`${ALARM_COUNT}Loading`] = true;
        app[RISK_COUNT] = 0;
        app[`${RISK_COUNT}Loading`] = true;

        // main metrics
        app[PROCESS_CPU_USAGE] = [];
        app[`${PROCESS_CPU_USAGE}Loading`] = true;
        app[PROCESS_MEMORY_USAGE] = [];
        app[`${PROCESS_MEMORY_USAGE}Loading`] = true;
        app[SYSTEM_CPU_USAGE] = [];
        app[`${SYSTEM_CPU_USAGE}Loading`] = true;
        app[SYSTEM_MEMORY_USAGE] = [];
        app[`${SYSTEM_MEMORY_USAGE}Loading`] = true;
        app[DISK_USAGE] = [];
        app[`${DISK_USAGE}Loading`] = true;

        // get main metrics
        this.getMainMetricData(PROCESS_CPU_USAGE, app.appId);
        this.getMainMetricData(PROCESS_MEMORY_USAGE, app.appId);
        this.getMainMetricData(SYSTEM_CPU_USAGE, app.appId);
        this.getMainMetricData(SYSTEM_MEMORY_USAGE, app.appId);
        this.getMainMetricData(DISK_USAGE, app.appId);
      }

      // get title metrics
      this.getTitleMetricData(INSTANCE_COUNT, appIds);
      this.getTitleMetricData(ALARM_COUNT, appIds);
      this.getTitleMetricData(RISK_COUNT, appIds);
      return apps;
    },

    setDataToApps(key, data) {
      for (const app of this.apps) {
        const value = data[app.appId];
        if (value && !isNaN(value) || value === 0) {
          app[key] = value;
        } else {
          app[key] = "-";
        }
        app[`${key}Loading`] = false;
      }
    },

    setMainMetricDataToApp(appId, key, list) {
      for (const app of this.apps) {
        if (Array.isArray(list) && appId === app.appId) {
          app[key] = list;
          app[`${key}Loading`] = false;
        }
      }
    },

    getApps() {
      this.reset();
      this.get(apps.msg, apps.url, { type: this.type }, data => {
        if (Array.isArray(data)) {
          this.apps = this.handleApps(data);
        }
      }, this.cancelToken.token, "appLoading");
    },

    getTitleMetricData(key, appIds) {
      this.get(http[key].msg, http[key].url, { appIds },
        data => this.setDataToApps(key, data), this.cancelToken.token)
        .catch(() => this.setDataToApps(key, {}));
    },

    getMainMetricData(key, appId) {
      this.get(http[key].msg, http[key].url, { appId },
        data => this.setMainMetricDataToApp(appId, key, data.list), this.cancelToken.token)
        .catch(() => this.setMainMetricDataToApp(appId, key, []));
    },

    goToFunction(appId, func) {
      this.$router.push({ path: `/app/${appId}/${func}` });
    },

    goToAgent(appId, type, agentId, pid) {
      const query = {};
      if (type === 'processCpuUsage' || type === 'processMemoryUsage') {
        query.tab = 'process';
        query.agentId = agentId;
        query.pid = pid;
      } else {
        query.instanceTab = 'system';
        query.agentId = agentId;
      }

      this.$router.push({ path: `/app/${appId}/instance`, query });
    }
  },

  computed: {
    noAppTip() {
      let tip = "";
      if (this.type === "myApps") {
        tip = "您的账号下暂无应用，点击右上角【创建新应用】按钮可以创建新应用";
      } else {
        tip = "您暂时没有加入任何应用";
      }
      return tip;
    }
  },

  watch: {
    type() {
      utils.cancelRequest(this.cancelToken);
      this.cancelToken = utils.createCancelToken();
      this.getApps();
    }
  }
};