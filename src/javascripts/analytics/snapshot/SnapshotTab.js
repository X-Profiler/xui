"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations } = utils.createNamespace("dashboard/analytics/snapshot");

export default {
  created() {
    // set variables by router
    const query = this.$route.query;
    this.selectedTab = query["snapshotTab"] || "suspected";
  },

  methods: {
    ...mapMutations(["setSnapshotTab"])
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "snapshotTab", "selectedTab");
    },

    selectedTab(...args) {
      utils.watchQueryKey.call(this, "snapshotTab", "selectedTab", args);
      this.setSnapshotTab(this.selectedTab);
    },
  }
};