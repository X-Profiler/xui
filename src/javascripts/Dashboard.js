"use strict";

import { http } from "./lib/Config";
import * as utils from "./lib/Utils";

const { app } = http;

export default {
  created() {
    this.appId = Number(this.$route.params.appId);
    this.menuTab = this.$route.params.menuTab;

    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    // get app info
    this.getAppInfo();
  },

  methods: {
    menuChanged(active) {
      this.menuTab = active;
      if (this.$route.params.menuTab !== active) {
        this.$router.push({ path: active });
      }
    },

    getAppInfo() {
      this.get(app.msg.get, app.url, { appId: this.appId }, data => {
        if (data.appName) {
          this.appName = data.appName;
        }
        this.currentUserIsOwner = data.currentUserIsOwner;
      }, this.cancelToken.token);
    }
  },

  watch: {
    $route(to) {
      if (to.params.menuTab !== this.menuTab) {
        this.menuTab = to.params.menuTab;
      }
    }
  }
};