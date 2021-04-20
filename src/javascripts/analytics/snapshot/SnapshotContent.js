"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics/snapshot");

export default {
  computed: {
    ...mapState(["snapshotTab"]),

    activeComponent() {
      let component = "";
      switch (this.snapshotTab) {
        default:
          break;
      }

      return component;
    }
  }
};