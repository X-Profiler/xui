"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations } = utils.createNamespace("dashboard/analytics");

export default {
  created() {
    // set variables by router
    const query = this.$route.query;
    this.selectedTab = query["diagTab"] || "jsStacks";

    this.rsetGoBack();
  },

  methods: {
    ...mapMutations(["incrementGoBack", "rsetGoBack"])
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "diagTab", "selectedTab");
    },

    selectedTab(...args) {
      const goForward = utils.watchQueryKey.call(this, "diagTab", "selectedTab", args);
      if (goForward) {
        this.incrementGoBack();
      }
    },
  }
};