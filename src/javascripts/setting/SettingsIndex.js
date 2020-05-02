"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/settings");
const { mapMethods: mapMethodsModify, mapWatch: mapWatchModify, handleMounted: handleMountedModify } =
  utils.modalRouteFactory("modalModify", "modifyModal", "modify", "setModifyModal");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getSettingsInfo({ cancelToken: this.cancelToken.token });
  },

  mounted() {
    handleMountedModify.call(this, "handleModifyModal");
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setModifyModal"]),

    ...mapActions(["getSettingsInfo"]),

    ...mapMethodsModify("handleModifyModal"),

    closeModifyModal() {
      this.setModifyModal({ status: false });
    }
  },

  computed: {
    ...mapState(["settings_loading", "settings_load_error", "modifyModal"])
  },

  watch: {
    ...mapWatchModify,

    $route(to) {
      this.handleModifyModal(to.query);
    }
  }
};
