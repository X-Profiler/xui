"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapMutations, mapActions } = utils.createNamespace("dashboard/team");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    this.getTeamMembers({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setConfirmModal"]),

    ...mapActions(["getTeamMembers"]),

    inviteMember() {
      if (!this.invitedUserId) {
        this.$Message.error("填写的邀请用户工号不能为空");
        return;
      }

      const data = this.createConfirmData(
        "invitation",
        "邀请成员",
        `将邀请用户 <strong>${this.invitedUserId}</strong> 至本应用，请注意这里需要输入正确的用户工号`,
        { userId: this.invitedUserId });
      this.setConfirmModal({ status: true, data });
    }
  },

  computed: {
    ...mapState(["members_loading", "members_load_error", "confirmModal", "confirmData"]),

    ...mapGetters(["createConfirmData"])
  },

  watch: {
    confirmModal() {
      if (this.confirmModal) {
        return;
      }
      const { type, success } = this.confirmData;
      if (type === "invitation") {
        this.invitedUserId = undefined;
      }
      if (success) {
        if (type === "leaveTeam") {
          this.$router.push({ path: "/console", query: { type: "joinedApps" } });
        } else {
          this.getTeamMembers({ cancelToken: this.cancelToken.token });
        }
      }
    }
  }
};