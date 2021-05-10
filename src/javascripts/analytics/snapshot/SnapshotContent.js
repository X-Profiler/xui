"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics/snapshot");

export default {
  computed: {
    ...mapState(["snapshotTab"]),

    activeComponent() {
      let component = "";
      switch (this.snapshotTab) {
        case "suspected":
          component = "x-suspected";
          break;
        case "dominator":
          component = "x-dominator";
          break;
        case "containment":
          component = "x-containment";
          break;
        case "search":
          component = "x-search";
          break;
        default:
          break;
      }

      return component;
    }
  }
};