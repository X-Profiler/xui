"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/team");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setConfirmModal"]),

    ...mapActions(["inviteMember", "deleteMember", "transferOwnership", "leaveTeam"]),

    closeConfirmModal() {
      this.setConfirmModal({ status: false });
    },

    submitRequest() {
      const { type, data } = this.confirmData;
      if (type === "invitation") {
        const { userId } = data;
        this.inviteMember({ cancelToken: this.cancelToken.token, userId });
      }

      if (type === "cancelInvitation") {
        const { userId } = data;
        this.deleteMember({ cancelToken: this.cancelToken.token, userId });
      }

      if (type === "deleteMember") {
        const { userId } = data;
        this.deleteMember({ cancelToken: this.cancelToken.token, userId });
      }

      if (type === "transferOwnership") {
        const { userId } = data;
        this.transferOwnership({ cancelToken: this.cancelToken.token, userId });
      }

      if (type === "leaveTeam") {
        this.leaveTeam({ cancelToken: this.cancelToken.token });
      }
    }
  },

  computed: {
    ...mapState(["confirmModal", "confirmData"])
  },
};