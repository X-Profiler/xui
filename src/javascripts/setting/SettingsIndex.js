"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/settings");
const { mapMethods: mapMethodsModify, mapWatch: mapWatchModify, handleMounted: handleMountedModify } =
  utils.modalRouteFactory("modalModify", "modifyModal", "modify", "setModifyModal");
const { mapMethods: mapMethodsDelete, mapWatch: mapWatchDelete, handleMounted: handleMountedDelete } =
  utils.modalRouteFactory("modalDelete", "deleteModal", "delete", "setDeleteModal");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getSettingsInfo({ cancelToken: this.cancelToken.token });
  },

  mounted() {
    handleMountedModify.call(this, "handleModifyModal");
    handleMountedDelete.call(this, "handleDeleteModal");
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setModifyModal", "setDeleteModal"]),

    ...mapActions(["getSettingsInfo"]),

    ...mapMethodsModify("handleModifyModal"),

    ...mapMethodsDelete("handleDeleteModal"),

    closeModifyModal() {
      this.setModifyModal({ status: false });
    },

    closeDeleteModal() {
      this.setDeleteModal({ status: false });
    }
  },

  computed: {
    ...mapState(["settings_loading", "settings_load_error", "modifyModal", "deleteModal"])
  },

  watch: {
    ...mapWatchModify,

    ...mapWatchDelete,

    $route(to) {
      this.handleModifyModal(to.query);
      this.handleDeleteModal(to.query);
    }
  }
};
