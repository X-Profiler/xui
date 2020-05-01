"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/alarm");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "tipModal", "tip", "setTipModal");

export default {
  mounted() {
    handleMounted.call(this, "handleTipModal");
  },

  beforeDestroy() {
    this.resetState();
  },

  methods: {
    ...mapMutations(["resetState", "setTipModal"]),

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