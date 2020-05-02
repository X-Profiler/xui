"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/settings");

export default {
  methods: {
    ...mapMutations(["setModifyModal"]),

    openNameModifyModal() {
      this.setModifyModal({ status: true });
    }
  },

  computed: {
    ...mapState(["settings_data"])
  }
};