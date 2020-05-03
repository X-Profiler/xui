"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard");

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();

    this.setAppId(Number(this.$route.params.appId));
    this.menuTab = this.$route.params.menuTab;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setAppId"]),

    ...mapActions(["getAppInfo"]),

    menuChanged(active) {
      this.menuTab = active;
      if (this.$route.params.menuTab !== active) {
        this.$router.push({ path: active });
      }
    },
  },

  computed: {
    ...mapState(["appId", "app_loading", "app_load_error", "app_data"])
  },

  watch: {
    $route(to) {
      this.menuTab = to.params.menuTab;
      this.setAppId(Number(to.params.appId));
    },

    appId() {
      // get app info
      this.getAppInfo(this.cancelToken.token);
    },

    menuTab() {
      for (const content of this.contentGroup) {
        if (content.value === this.menuTab) {
          this.activeContent = content;
        }
      }
    },

    app_data() {
      const data = this.app_data || {};
      if (data.appName) {
        this.appName = data.appName;
        this.currentUserIsOwner = data.currentUserIsOwner;
      }
    }
  }
};