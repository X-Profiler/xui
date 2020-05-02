"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/alarm");
const { mapState: mapStateHistory } = utils.createNamespace("dashboard/alarm/history");

export default {
  methods: {
    updateCount(count) {
      this.totalCount = count;
    }
  },

  computed: {
    ...mapState(["historyData"]),

    ...mapStateHistory(["history_loading", "history_load_error"])
  }
};