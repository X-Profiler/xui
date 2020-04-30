"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/alarm");

export default {
  methods: {
    formatPushType(pushType) {
      let label = "";
      switch (pushType) {
        case "p1":
          label = "P1 (致电)";
          break;
        case "p2":
          label = "P2 (短信)";
          break;
        case "p3":
          label = "P3 (邮件通知)";
          break;
        case "p4":
          label = "P4 (数据记录)";
          break;
        default:
          break;
      }

      return label;
    },

    formatContextType(contextType) {
      let label = "";
      switch (contextType) {
        case "xprofiler_log":
          label = "X-Profiler 插件日志";
          break;
        case "xtransit_notification":
          label = "X-Transit 通知信息";
          break;
        case "system_log":
          label = "操作系统指标日志";
          break;
        case "error_log":
          label = "Node.js 应用错误日志";
          break;
        default:
          break;
      }

      return label;
    },

    showAlarmList() {

    }
  },

  computed: {
    ...mapState(["rules_data"]),

    rules() {
      const data = this.rules_data;
      if (Array.isArray(data)) {
        return data.map(item => {
          const tmp = Object.assign({
            disabled: false
          }, item);
          return tmp;
        });
      }
      return [];
    }
  }
};