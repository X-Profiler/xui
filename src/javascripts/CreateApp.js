"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("consoler");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setNewAppModal"]),

    ...mapActions(["createNewApp"]),

    closeNewAppModal() {
      this.setNewAppModal({ status: false });
    },

    submitNewAppCreation() {
      let newAppName = this.newAppName.trim();

      // check app name
      if (!newAppName) {
        utils.error.call(this, "应用名称不能为空！");
        return;
      }
      if (newAppName.length > 30) {
        utils.error.call(this, "应用名称不能超过 30 个字符！");
        return;
      }

      this.createNewApp({ cancelToken: this.cancelToken.token, newAppName });
    },
  },

  computed: {
    ...mapState(["new_app_loading", "new_app_load_error"])
  }
};