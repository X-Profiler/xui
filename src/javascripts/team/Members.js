"use strict";

import moment from "moment";
import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapMutations } = utils.createNamespace("dashboard/team");

export default {
  methods: {
    ...mapMutations(["setConfirmModal"]),

    formatStatus(status) {
      let label = "未知";
      switch (status) {
        case 0:
          label = "管理员";
          break;
        case 1:
          label = "邀请中";
          break;
        case 2:
          label = "已加入";
          break;
        default:
          break;
      }
      return label;
    },

    formatTime(timestamp) {
      return moment(timestamp).format("YYYY-MM-DD HH:mm:SS");
    },

    cancelInvitation({ userId, userInfo }) {
      const data = this.createConfirmData(
        "cancelInvitation",
        "撤销邀请",
        `撤销对用户 <strong>${userInfo}</strong> 的邀请，后续您仍然可以邀请此用户加入本应用`,
        { userId });
      this.setConfirmModal({ status: true, data });
    },

    deleteMember({ userId, userInfo }) {
      const data = this.createConfirmData(
        "deleteMember",
        "移除成员",
        `将用户 <strong>${userInfo}</strong> 移出本应用，后续您仍然可以邀请此用户加入本应用`,
        { userId });
      this.setConfirmModal({ status: true, data });
    }
  },

  computed: {
    ...mapState(["members_data"]),

    ...mapGetters(["createConfirmData"]),

    members() {
      const { list } = this.members_data;
      list.sort((o, n) => {
        if (o.status > n.status) {
          return 1;
        } else if (o.status === n.status && o.timestamp > n.timestamp) {
          return 1;
        } else {
          return -1;
        }
      });
      return list;
    },

    appOwnerId() {
      const { list } = this.members_data;
      let admin = list.filter(member => member.status === 0);
      if (admin.length) {
        admin = admin[0].userId;
      }
      return admin;
    },

    currentUserId() {
      const { currentUserId } = this.members_data;
      return currentUserId;
    }
  }
};