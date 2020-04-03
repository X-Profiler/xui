"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/file");

export default {
  computed: {
    ...mapState(["files_loading", "files_load_error", "filterType"])
  }
};