"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapMutations, mapActions } = utils.createNamespace("dashboard/alarm");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.updateRules();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setTipModal", "setContactsModal", "setEditModel", "setHistoryDrawer"]),

    ...mapActions(["deleteRule", "putRuleStatus"]),

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

    updateRules() {
      const data = this.rules_data;
      if (Array.isArray(data)) {
        this.rules = data.map((item, index) => {
          const tmp = Object.assign({
            disabled: Number(item.status) === 0,
            index
          }, item);
          return tmp;
        });
      }
    },

    openHistoryDrawer({ strategyId, expression }) {
      this.setHistoryDrawer({ status: true, historyData: { strategyId, expression } });
    },

    openContactsModal(data) {
      this.setContactsModal({ status: true, data });
    },

    doAction(title, func, requestData, needRefresh = true, cb) {
      const data = { title, error: undefined, loading: false };
      this.setTipModal({ status: true, data });
      data.loading = true;
      this[func](
        {
          cancelToken: this.cancelToken.token,
          data: { ...requestData }
        })
        .then(() => {
          this.setTipModal({ status: false });
          if (needRefresh) {
            this.$emit("refreshRules");
          }
          if (typeof cb === "function") {
            cb();
          }
        })
        .catch(err => {
          data.loading = false;
          data.error = err.message;
        });
    },

    delete({ strategyId }) {
      this.doAction("删除规则", "deleteRule", { strategyId });
    },

    updateStatus(row, status) {
      const { strategyId } = row;
      const title = status === 0 ? "禁用规则" : "启用规则";
      this.doAction(title, "putRuleStatus", { strategyId, status },
        false, () => row.disabled = !status);
    },

    operateRule(operation, row) {
      if (operation === "edit") {
        this.setEditModel({ status: true, data: row });
      }

      if (operation === "delete") {
        this.delete(row);
      }

      if (operation === "disable") {
        this.updateStatus(row, 0);
      }

      if (operation === "enable") {
        this.updateStatus(row, 1);
      }

      const element = this.$refs[`dropdown-${row.index}`];
      if (element) {
        element.mouseout();
      }
    }
  },

  computed: {
    ...mapState(["rules_data"]),

    ...mapGetters(["formatContextType"])
  },

  watch: {
    rules_data() {
      this.updateRules();
    }
  }
};