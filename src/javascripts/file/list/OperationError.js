"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/file");

export default {
  methods: {
    ...mapMutations(["setErrorModal"]),

    closeErrorModal() {
      this.setErrorModal({ status: false });
    }
  },

  computed: {
    ...mapState(["errorModalData"])
  },
};