"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/file/wrapper");

export default {
  computed: {
    ...mapState(["diagData"])
  }
};