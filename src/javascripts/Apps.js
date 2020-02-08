'use strict';

import { http } from "./lib/Config";
import * as utils from "./lib/Utils";

const { apps } = http;

export default {
  created() {
    // set common http methods
    this.get = utils.get.bind(this);

    // get apps
    this.getApps();
  },

  methods: {
    reset() {
      this.apps = [];
    },

    formatCount(count) {
      let res = count;
      if (count > 9999) {
        res = (res / 1000).toFixed(1) + 'K';
      }
      return res;
    },

    randomColor(index) {
      const length = this.colors.length;
      let color = this.colors[index % length];
      return color;
    },

    handleApps(apps) {
      const appIds = [];
      for (const app of apps) {
        appIds.push(app.appId);
        app['instanceCount'] = 0;
        app['instanceCountLoading'] = true;
        app['alarmCount'] = 0;
        app['alarmCountLoading'] = true;
        app['riskCount'] = 0;
        app['riskCountLoading'] = true;
      }
      this.getTitleMetricData('instanceCount', appIds);
      this.getTitleMetricData('alarmCount', appIds);
      this.getTitleMetricData('riskCount', appIds);
      return apps;
    },

    setDataToApps(key, data) {
      for (const app of this.apps) {
        const value = data[app.appId];
        if (value && !isNaN(value) || value === 0) {
          app[key] = value;
        } else {
          app[key] = '-';
        }
        app[`${key}Loading`] = false;
      }
    },

    getApps() {
      this.reset();
      this.get(apps.msg, apps.url, { type: this.type }, data => {
        if (Array.isArray(data)) {
          this.apps = this.handleApps(data);
        }
      }, 'appLoading');
    },

    getTitleMetricData(key, appIds) {
      this.get(http[key].msg, http[key].url, { appIds },
        data => this.setDataToApps(key, data))
        .catch(() => this.setDataToApps(key, {}));
    },
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
      this.getApps();
    }
  }
};