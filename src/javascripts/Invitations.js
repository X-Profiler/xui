"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapActions } = utils.createNamespace("dashboard/team");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["updateInviationStatus"]),

    updateStatus(invitation, loadingKey, status) {
      const { appId } = invitation;
      invitation[loadingKey] = true;
      this.updateInviationStatus({ cancelToken: this.cancelToken.token, appId, status })
        .then(() => this.$emit("refreshApps"))
        .catch(err => this.$Message.error(err.message))
        .then(() => invitation[loadingKey] = false);
    },

    rejectInvitation(invitation) {
      this.updateStatus(invitation, "rejectLoading", 0);
    },

    confirmInvitation(invitation) {
      this.updateStatus(invitation, "confirmLoading", 1);
    }
  }
};