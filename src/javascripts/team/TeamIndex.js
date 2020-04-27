"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapActions } = utils.createNamespace("dashboard/team");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getTeamMembers({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getTeamMembers"])
  },

  computed: {
    ...mapState(["members_loading", "members_load_error", "members_data"])
  }
};