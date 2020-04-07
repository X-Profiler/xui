"use strict";

import { tags } from "@/javascripts/config";
import * as utils from "@/javascripts/lib/utils";

const { mapState, mapActions } = utils.createNamespace("consoler");

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

    // get apps
    this.getApps({ cancelToken: this.cancelToken.token, type: this.type });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getApps", "getOverviewMetrics", "getMainMetrics"]),

    formatCount(count) {
      if (!utils.isNumber(count)) {
        return count;
      }
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
      let style = "color: ";
      if (instance.status === 0) {
        style += "#c5c8ce";
      } else if (instance.status === 1) {
        style += "#2a9446";
      } else if (instance.status == 2) {
        style += "#f89501";
      } else {
        style += "#e33900";
      }
      return style;
    },

    handleApps(apps) {
      const appIds = [];
      const list = [];
      for (const data of apps) {
        const app = Object.assign({}, data);
        list.push(app);
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

        // get title metrics
        this.getOverviewMetricData([INSTANCE_COUNT, ALARM_COUNT, RISK_COUNT], app.appId);

        // get main metrics
        this.getMainMetricData(PROCESS_CPU_USAGE, app.appId);
        this.getMainMetricData(PROCESS_MEMORY_USAGE, app.appId);
        this.getMainMetricData(SYSTEM_CPU_USAGE, app.appId);
        this.getMainMetricData(SYSTEM_MEMORY_USAGE, app.appId);
        this.getMainMetricData(DISK_USAGE, app.appId);
      }

      return list;
    },

    getAppByAppId(appId) {
      const app = this.apps.filter(app => app.appId === appId);
      return app[0];
    },

    setDataToApps(appId, keys, data) {
      const app = this.getAppByAppId(appId);
      if (!app) {
        return;
      }
      for (const key of keys) {
        const value = data[key];
        if (utils.isNumber(value)) {
          app[key] = value;
        } else {
          app[key] = "-";
        }
        app[`${key}Loading`] = false;
      }
    },

    setMainMetricDataToApp(appId, key, list) {
      const app = this.getAppByAppId(appId);
      if (!app) {
        return;
      }
      app[key] = list;
      app[`${key}Loading`] = false;
    },

    getOverviewMetricData(keys, appId) {
      this.getOverviewMetrics({ cancelToken: this.cancelToken.token, appId })
        .then(data => this.setDataToApps(appId, keys, data))
        .catch(() => this.setDataToApps(appId, keys, {}));
    },

    getMainMetricData(key, appId) {
      this.getMainMetrics({ cancelToken: this.cancelToken.token, urlKey: key, appId })
        .then(data => this.setMainMetricDataToApp(appId, key, data.list))
        .catch(() => this.setMainMetricDataToApp(appId, key, []));
    },

    goToFunction(appId, func) {
      this.$router.push({ path: `/app/${appId}/${func}` });
    },

    goToFunction2(appId, metricType) {
      let func = "";
      const query = {};
      if (metricType === "instanceCount") {
        func = "instance";
      } else if (metricType === "alarmCount") {
        func = "alarm";
      } else if (metricType === "riskCount") {
        func = "instance";
        query.tab = "module_risk";
      }
      this.$router.push({ path: `/app/${appId}/${func}`, query });
    },

    goToAgent(appId, type, agentId, pid) {
      const query = {};
      if (type === "processCpuUsage" || type === "processMemoryUsage") {
        query.tab = "process";
        query.agentId = agentId;
        query.pid = pid;
      } else {
        query.tab = "system";
        query.agentId = agentId;
      }

      this.$router.push({ path: `/app/${appId}/instance`, query });
    },

    refreshApps() {
      utils.cancelRequest(this.cancelToken);
      this.cancelToken = utils.createCancelToken();
      this.getApps({ cancelToken: this.cancelToken.token, type: this.type });
    }
  },

  computed: {
    ...mapState(["app_list_loading", "app_list_load_error", "app_list_data"]),

    noAppTip() {
      let tip = "";
      if (this.type === "myApps") {
        tip = utils.getTag(tags.noAppTipOnMyAccount);
      } else {
        tip = utils.getTag(tags.noAppTipOnJoinedAccount);
      }
      return tip;
    }
  },

  watch: {
    type() {
      this.refreshApps();
    },

    app_list_data() {
      const list = this.app_list_data;
      if (Array.isArray(list)) {
        this.apps = this.handleApps(list);
      }
    }
  }
};