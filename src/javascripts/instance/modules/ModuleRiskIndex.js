"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/instance/modules");

export default {
  computed: {
    ...mapState(["moduleFile", "files_loading", "files_load_error", "module_loading", "module_load_error"])
  }
};