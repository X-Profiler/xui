"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/instance/errors");

export default {
  computed: {
    ...mapState(["files_loading", "files_load_error", "logs_loading", "logs_load_error"])
  }
};