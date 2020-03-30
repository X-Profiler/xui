"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/instance/modules");

export default {
  computed: {
    ...mapState(["files_loading", "files_load_error", "modules_loading", "modules_load_error"])
  }
};