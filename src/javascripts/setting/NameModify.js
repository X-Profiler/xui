"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations, mapActions } = utils.createNamespace("dashboard/settings");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setModifyModal", "updateSettingsAppName"]),

    ...mapActions(["putNewAppName"]),

    closeModifyModal() {
      this.setModifyModal({ status: false });
    },

    submitNewAppName() {
      const newAppName = this.newAppName.trim();

      // check app name
      if (!newAppName) {
        this.$Message.error("应用名称不能为空！");
        return;
      }

      if (newAppName.length > 30) {
        this.$Message.error("应用名称不能超过 30 个字符！");
        return;
      }

      this.loading = true;
      this
        .putNewAppName({ cancelToken: this.cancelToken.token, newAppName })
        .then(() => {
          this.setModifyModal({ status: false });
          this.updateSettingsAppName(newAppName);
        })
        .catch(err => {
          this.error = err.message;
          this.loading = false;
        });
    }
  }
};