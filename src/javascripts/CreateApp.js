"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("consoler");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.set_new_app_load_error(undefined);
    this.set_new_app(undefined);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setNewAppModal", "set_new_app_load_error", "set_new_app"]),

    ...mapActions(["createNewApp"]),

    closeNewAppModal() {
      this.setNewAppModal({ status: false });
      if (this.new_app_data) {
        this.$emit("refresh");
      }
    },

    submitNewAppCreation() {
      let newAppName = this.newAppName.trim();

      // check app name
      if (!newAppName) {
        this.$Message.error("应用名称不能为空！");
        return;
      }

      if (newAppName.length > 30) {
        this.$Message.error("应用名称不能超过 30 个字符！");
        return;
      }

      this.createNewApp({ cancelToken: this.cancelToken.token, newAppName });
    },
  },

  computed: {
    ...mapState(["new_app_loading", "new_app_load_error", "new_app_data"]),

    newAppInfo() {
      const new_app_data = this.new_app_data;
      if (!new_app_data) {
        return [];
      }

      const info = [];
      const { appName, appId, appSecret } = new_app_data;

      if (appName) {
        info.push({ label: "应用名称", value: appName });
      }

      if (appId) {
        info.push({ label: "应用 ID", value: appId });
      }

      if (appSecret) {
        info.push({ label: "应用 Secret", value: appSecret });
      }

      return info;
    }
  }
};