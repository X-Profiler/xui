"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/alarm");

export default {
  computed: {
    ...mapState(["historyData"])
  }
};