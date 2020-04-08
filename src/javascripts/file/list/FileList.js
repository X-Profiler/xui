"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/file");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "errorModal", "actionError", "setErrorModal");
const { mapMethods: mapMethodsDeletion, mapWatch: mapWatchDeletion, handleMounted: handleMountedDeletion } =
  utils.modalRouteFactory("modalQueryKeyDeletion", "fileDeletionModal", "fileDeletion", "setDeletionModal");


export default {
  mounted() {
    handleMounted.call(this, "handleErrorModal");
    handleMountedDeletion.call(this, "handleDeletionModal");
  },

  methods: {
    ...mapMutations(["setErrorModal", "setDeletionModal"]),

    ...mapMethods("handleErrorModal"),

    ...mapMethodsDeletion("handleDeletionModal"),

    closeErrorModal() {
      this.setErrorModal({ status: false });
    },

    closeDeletionModal() {
      this.setDeletionModal({ status: false });
    }
  },

  computed: {
    ...mapState(["files_loading", "files_load_error", "filterType",
      "errorModal", "errorModalData", "fileDeletionModal"])
  },

  watch: {
    ...mapWatch,

    ...mapWatchDeletion,

    $route(to) {
      this.handleErrorModal(to.query);
      this.handleDeletionModal(to.query);
    },
  }
};