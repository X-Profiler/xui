"use strict";

import { http } from "./config";
import * as utils from "./lib/utils";

const { app } = http;
const { mapState, mapMutations } = utils.createNamespace("dashboard");

export default {
  created() {
    this.setAppId(Number(this.$route.params.appId));
    this.menuTab = this.$route.params.menuTab;

    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    // get app info
    this.getAppInfo();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setAppId"]),

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
      }, this.cancelToken.token, "appInfoLoading");
    }
  },

  computed: {
    ...mapState(["appId"])
  },

  watch: {
    $route(to) {
      this.menuTab = to.params.menuTab;
    },

    menuTab() {
      for (const content of this.contentGroup) {
        if (content.value === this.menuTab) {
          this.activeContent = content;
        }
      }
    }
  }
};