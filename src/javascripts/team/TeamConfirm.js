"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/team");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "confirmModal", "confirm", "setConfirmModal");

export default {
  mounted() {
    handleMounted.call(this, "handleConfirmModal");
  },

  methods: {
    ...mapMutations(["setConfirmModal"]),

    ...mapMethods("handleConfirmModal"),

    closeConfirmModal() {
      this.setConfirmModal({ status: false });
    }
  },

  computed: {
    ...mapState(["confirmModal", "confirmData"])
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleConfirmModal(to.query);
    }
  }
};