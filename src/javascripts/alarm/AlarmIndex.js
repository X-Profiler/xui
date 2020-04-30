"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/alarm");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "tipModal", "tip", "setTipModal");

export default {
  mounted() {
    handleMounted.call(this, "handleTipModal");
  },

  methods: {
    ...mapMutations(["setTipModal"]),

    ...mapMethods("handleTipModal"),

    closeTipModal() {
      this.setTipModal({ status: false });
    }
  },

  computed: {
    ...mapState(["tipModal", "tipData"])
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleTipModal(to.query);
    }
  }
};