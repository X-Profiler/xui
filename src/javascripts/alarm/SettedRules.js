"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/alarm");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setTipModal", "setEditModel"]),

    ...mapActions(["deleteRule"]),

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

    },

    delete({ strategyId }) {
      const data = { title: "删除规则", error: undefined, loading: false };
      this.setTipModal({ status: true, data });
      data.loading = true;
      this
        .deleteRule({ cancelToken: this.cancelToken.token, data: { strategyId } })
        .then(() => {
          this.setTipModal({ status: false });
          this.$emit("refreshRules");
        })
        .catch(err => {
          data.loading = false;
          data.error = err.message;
        });
    },

    operateRule(operation, row) {
      if (operation === "edit") {
        this.setEditModel({ status: true, data: row });
      }

      if (operation === "delete") {
        this.delete(row);
      }

      this.$refs[`dropdown-${row.index}`].mouseout();
    }
  },

  computed: {
    ...mapState(["rules_data"]),

    rules() {
      const data = this.rules_data;
      if (Array.isArray(data)) {
        return data.map((item, index) => {
          const tmp = Object.assign({
            disabled: false,
            index
          }, item);
          return tmp;
        });
      }
      return [];
    }
  }
};