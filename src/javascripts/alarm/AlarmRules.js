"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/alarm");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getRules({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["resetState"]),

    ...mapActions(["getRules"]),

    refreshRules() {
      this.getRules({ cancelToken: this.cancelToken.token });
      this.resetState();
    }
  },

  computed: {
    ...mapState(["rules_loading", "rules_load_error"])
  }
};