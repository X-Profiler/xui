"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics/diag");
const { mapState: mapStateAnalytics } = utils.createNamespace("dashboard/analytics");

export default {
  computed: {
    ...mapState(["diagTab"]),

    ...mapStateAnalytics(["file_data"]),

    activeComponent() {
      let component = "";
      switch (this.diagTab) {
        case "jsStacks":
          component = "x-javascript";
          break;
        case "nativeStacks":
          component = "x-native";
          break;
        default:
          break;
      }

      return component;
    }
  }
};