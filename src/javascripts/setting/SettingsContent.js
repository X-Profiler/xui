"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/settings");

export default {
  methods: {
    ...mapMutations(["setModifyModal", "setDeleteModal"]),

    openNameModifyModal() {
      this.setModifyModal({ status: true });
    },

    openDeleteAppModal() {
      this.setDeleteModal({ status: true });
    }
  },

  computed: {
    ...mapState(["settings_data"])
  }
};