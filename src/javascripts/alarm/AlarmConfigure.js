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
    ...mapMutations(["resetState", "setTipModal", "setEditModel"]),

    ...mapActions(["getRules", "postRule", "putRule"]),

    reset() {
      const modelMap = this.modelMap;
      modelMap.contextType = "xprofiler_log";
      modelMap.pushType = "p3";
      modelMap.webhookType = "dingtalk";
      modelMap.webhookAddress = undefined;
      modelMap.webhookSign = undefined;
      modelMap.fastRules = undefined;
      modelMap.customRuleExpr = undefined;
      modelMap.customRuleDesc = undefined;
      this.checkboxMap.webhookPush = false;
      this.resetState();
    },

    checkNeedShow({ type, dependent, dependentValue }, showType) {
      const needShow = showType === "label" || type === showType;

      if (dependent === "checkbox") {
        return needShow && this.checkboxMap[dependentValue];
      }

      return needShow;
    },

    checkRequired(obj, key, message) {
      if (!obj[key]) {
        this.$Message.error(message);
        return false;
      }
      return true;
    },

    cancelEdit() {
      this.setEditModel({ status: false, data: {} });
    },

    operateRule(operation) {
      const map = this.modelMap;
      const required =
        this.checkRequired(map, "contextType", "判定上下文类型不能为空") &&
        this.checkRequired(map, "pushType", "消息推送级别不能为空") &&
        this.checkRequired(map, "customRuleExpr", "自定义阈值表达式不能为空") &&
        this.checkRequired(map, "customRuleDesc", "告警推送内容不能为空");
      if (!required) {
        return;
      }

      // check webhook push
      if (this.checkboxMap.webhookPush) {
        const required =
          this.checkRequired(map, "webhookType", "webhook 类型不能为空") &&
          this.checkRequired(map, "webhookAddress", "webhook 地址不能为空");
        if (!required) {
          return;
        }
      }

      let func = "";
      let loading = "";
      let title = "";
      if (operation === "add") {
        loading = "addRuleLoading";
        func = "postRule";
        title = "添加规则失败";
      }

      if (operation === "update") {
        loading = "updateRuleLoading";
        func = "putRule";
        title = "更新规则失败";
      }

      this[loading] = true;

      this[func](
        {
          cancelToken: this.cancelToken.token,
          data: {
            strategyId: this.editData.strategyId,
            contextType: map.contextType,
            pushType: map.pushType,
            customRuleExpr: map.customRuleExpr,
            customRuleDesc: map.customRuleDesc,
            webhookPush: this.checkboxMap.webhookPush,
            webhookType: map.webhookType,
            webhookAddress: map.webhookAddress,
            webhookSign: map.webhookSign
          }
        })
        .then(() => {
          this.getRules({ cancelToken: this.cancelToken.token });
          this[loading] = false;
          this.reset();
        })
        .catch(err => {
          const data = { title, error: err.message, loading: false };
          this.setTipModal({ status: true, data });
        })
        .then(() => this[loading] = false);
    }
  },

  computed: {
    ...mapState(["editModel", "editData"])
  },

  watch: {
    "modelMap.fastRules": function () {
      const modelMap = this.modelMap;
      const { fastRules: type } = modelMap;

      switch (type) {
        case "fast_rule_memory":
          modelMap.contextType = "xprofiler_log";
          modelMap.customRuleExpr = "@heap_used / @heap_limit > 0.7";
          modelMap.customRuleDesc = "已用堆内存超过堆上限的 70%，当前为 ${@heap_used / @heap_limit * 100}%";
          break;
        case "fast_rule_cpu":
          modelMap.contextType = "xprofiler_log";
          modelMap.customRuleExpr = "@cpu_60 > 80";
          modelMap.customRuleDesc = "1 分钟内 CPU 使用率超过 80%，当前为 ${@cpu_60}%";
          break;
        case "fast_rule_gc":
          modelMap.contextType = "xprofiler_log";
          modelMap.customRuleExpr = "@gc_60 > 15";
          modelMap.customRuleDesc = "1 分钟内 GC 消耗超过 15%，当前为 ${@gc_60}%";
          break;
        case "fast_rule_expired_request":
          modelMap.contextType = "system_log";
          modelMap.customRuleExpr = "@expired_request > 0";
          modelMap.customRuleDesc = "1 分钟内响应超过 30s 时请求出现 ${@expired_request} 个，请多加关注";
          break;
        case "fast_rule_illegal_request":
          modelMap.contextType = "system_log";
          modelMap.customRuleExpr = "@code_4xx / @http_response_sent + @code_5xx / @http_response_sent > 0.5";
          modelMap.customRuleDesc = "1 分钟内 4xx 和 5xx 请求数占比超过 50%，当前为 (${@code_4xx}, ${@code_5xx}) / ${@http_response_sent}";
          break;
        case "fast_rule_os_memory":
          modelMap.contextType = "system_log";
          modelMap.customRuleExpr = "@os_mem_usage > 80";
          modelMap.customRuleDesc = "系统内存整体使用率超过 80%，当前为 ${@os_mem_usage}%";
          break;
        case "fast_rule_os_cpu":
          modelMap.contextType = "system_log";
          modelMap.customRuleExpr = "@os_cpu_usage > 80";
          modelMap.customRuleDesc = "系统 CPU 整体使用率超过 80%，当前为 ${@os_cpu_usage}%";
          break;
        case "fast_rule_disk_usage":
          modelMap.contextType = "system_log";
          modelMap.customRuleExpr = "@disk_usage > 85";
          modelMap.customRuleDesc = "磁盘 (${@mounted_on}) 占比超过 85%：为 ${@disk_usage}%";
          break;
        case "fast_rule_error_log_content":
          modelMap.contextType = "error_log";
          modelMap.customRuleExpr = "@error_type == \"TypeError\" || @error_type ==  \"SyntaxError\"";
          modelMap.customRuleDesc = "发生错误 ${@error_type}，堆栈是：${@stack}";
          break;
        case "fast_rule_dependence_security_risk":
          modelMap.contextType = "xtransit_notification";
          modelMap.customRuleExpr = "@critical > 0 || @high > 0";
          modelMap.customRuleDesc = "项目依赖发现极危漏洞 ${@critical} 个，高危漏洞 ${@high} 个，请尽快升级修复";
          break;
        case "fast_rule_coredump":
          modelMap.contextType = "xtransit_notification";
          modelMap.customRuleExpr = "@corefile_created";
          modelMap.customRuleDesc = "服务器生成 coredump 文件，路径为：${@corefile}，请分析查看原因!";
          break;
        case "fast_rule_node_process_exit":
          modelMap.contextType = "xtransit_notification";
          modelMap.customRuleExpr = "@node_process_exit";
          modelMap.customRuleDesc = "实例 ${@agent_id} 上 Node.js 进程 ${@pid} 退出，命令信息：${@cmd}";
          break;
        default:
          modelMap.contextType = "xprofiler_log";
          modelMap.customRuleExpr = undefined;
          modelMap.customRuleDesc = undefined;
          break;
      }
    },

    editData() {
      const modelMap = this.modelMap;
      const checkboxMap = this.checkboxMap;

      const {
        contextType,
        pushType,
        webhookPush,
        webhookType,
        webhookAddress,
        webhookSign,
        expression: customRuleExpr,
        alarmContent: customRuleDesc
      } = this.editData;

      modelMap.contextType = contextType || "xprofiler_log";
      modelMap.pushType = pushType || "p3";
      checkboxMap.webhookPush = webhookPush || false;
      modelMap.webhookType = webhookType || "dingtalk";
      modelMap.webhookAddress = webhookAddress;
      modelMap.webhookSign = webhookSign;
      modelMap.customRuleExpr = customRuleExpr;
      modelMap.customRuleDesc = customRuleDesc;
    }
  }
};