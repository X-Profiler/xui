"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics/diag");

export default {
  computed: {
    ...mapState(["diagTab"])
  }
};