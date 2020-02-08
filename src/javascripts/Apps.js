'use strict';

import { http } from "./lib/Config";
import * as utils from "./lib/Utils";

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

    randomColor(index) {
      const length = this.colors.length;
      let color = this.colors[index % length];
      return color;
    },

    getApps() {
      this.reset();
      this.get(http.apps.msg, http.apps.url, { type: this.type }, data => {
        if (Array.isArray(data)) {
          this.apps = data;
        }
      }, 'appLoading');
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
      this.getApps();
    }
  }
};