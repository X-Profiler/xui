"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/alarm");

export default {
  methods: {
    ...mapMutations(["setTipModal"]),

    closeTipModal() {
      this.setTipModal({ status: false });
    }
  },

  computed: {
    ...mapState(["tipData"])
  }
};