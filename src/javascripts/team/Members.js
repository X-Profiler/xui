"use strict";

import moment from "moment";
import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/team");

export default {
  methods: {
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
    }
  },

  computed: {
    ...mapState(["members_data"]),

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