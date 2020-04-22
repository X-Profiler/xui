"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapGetters } = utils.createNamespace("dashboard/analytics/gc");

export default {
  computed: {
    ...mapGetters(["pauseTimeWithStart", "memoryChangeWithStart"]),
  }
};