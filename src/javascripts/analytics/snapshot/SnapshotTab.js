"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations } = utils.createNamespace("dashboard/analytics/diag");

export default {
  created() {
    // set variables by router
    const query = this.$route.query;
    this.selectedTab = query["diagTab"] || "jsStacks";
  },

  methods: {
    ...mapMutations(["setDiagTab"])
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "diagTab", "selectedTab");
    },

    selectedTab(...args) {
      utils.watchQueryKey.call(this, "diagTab", "selectedTab", args);
      this.setDiagTab(this.selectedTab);
    },
  }
};