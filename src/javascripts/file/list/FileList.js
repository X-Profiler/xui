"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/file");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "errorModal", "actionError", "setErrorModal");

export default {
  mounted() {
    handleMounted.call(this, "handleErrorModal");
  },

  methods: {
    ...mapMutations(["setErrorModal"]),

    ...mapMethods("handleErrorModal"),

    closeErrorModal() {
      this.setErrorModal({ status: false });
    },
  },

  computed: {
    ...mapState(["files_loading", "files_load_error", "filterType", "errorModal", "errorModalData"])
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleErrorModal(to.query);
    },
  }
};