<template>
  <div>
    <!-- sub title -->
    <div class="alarm-wrapper">
      <div class="section-title alarm">配置告警项</div>
    </div>

    <!-- configure content -->
    <div
      v-for="(cfg, index) in configures"
      :key="index"
      class="configure-wrapper"
      :style="index !== 0 && checkNeedShow(cfg, 'label') ? 'margin-top: 15px;' : ''"
    >
      <!-- label -->
      <div class="label-group">
        <transition name="slide-noward">
          <div v-if="checkNeedShow(cfg, 'label')" class="label">{{ cfg.label }}</div>
        </transition>
      </div>

      <!-- selector -->
      <transition name="slide-noward">
        <div v-if="checkNeedShow(cfg, 'selector')" class="selector-group">
          <div class="selector">
            <Select
              v-model="modelMap[cfg.value]"
              :placeholder="cfg.placeholder"
              class="agent-selector context-selector"
              :style="cfg.width ? `width: ${cfg.width}px;` : ''"
            >
              <Option
                v-for="option in optionMap[cfg.value]"
                :value="option.value"
                :key="option.value"
                :disabled="option.disabled"
              >{{ option.label }}</Option>
            </Select>
          </div>
        </div>
      </transition>

      <!-- input -->
      <transition name="slide-noward">
        <div v-if="checkNeedShow(cfg, 'input')" class="input-group">
          <Input
            v-model="modelMap[cfg.value]"
            :placeholder="cfg.placeholder || placeholderMap[modelMap[cfg.placeholderValue]]"
            class="input"
          />
        </div>
      </transition>

      <!-- webhook -->
      <div v-if="cfg.type === 'webhook'" class="webhook-group">
        <div class="webhook">
          <Checkbox v-model="checkboxMap[cfg.value]">
            <span style="margin-left: 5px;">启用</span>
          </Checkbox>
        </div>
      </div>

      <!-- opreations -->
      <div v-if="cfg.type === 'button'" class="button-group">
        <div v-if="editRule"></div>
        <div v-else>
          <Button class="button" type="info">添加规则</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alarmConfigureModule from "@/javascripts/alarm/AlarmConfigure";

export default {
  data() {
    return {
      configures: [
        {
          label: "判定上下文类型",
          type: "selector",
          value: "contextType"
        },
        {
          label: "消息推送级别",
          type: "selector",
          value: "pushType"
        },
        {
          label: "附加 webhook 推送",
          type: "webhook",
          value: "webhookPush"
        },
        {
          label: "webhook 类型",
          type: "selector",
          value: "webhookType",
          dependent: "checkbox",
          dependentValue: "webhookPush"
        },
        {
          label: "webhook 地址",
          type: "input",
          value: "webhookAddress",
          dependent: "checkbox",
          dependentValue: "webhookPush",
          placeholderValue: "webhookType"
        },
        {
          label: "webhook 签名",
          type: "input",
          value: "webhookSign",
          dependent: "checkbox",
          dependentValue: "webhookPush",
          placeholder: "&sign=xxxxxx"
        },
        {
          label: "预设规则列表",
          type: "selector",
          value: "fastRules",
          placeholder: "自定义表达式",
          width: 500
        },
        {
          label: "自定义阈值表达式",
          type: "input",
          value: "customRuleExpr",
          placeholder: "eg. @heap_used / @heap_limit > 0.7"
        },
        {
          label: "告警推送内容",
          type: "input",
          value: "customRuleDesc",
          placeholder:
            "已用堆内存超过堆上限的 70%，当前为 ${@heap_used / @heap_limit * 100}%"
        },
        {
          label: "",
          type: "button"
        }
      ],
      checkboxMap: {
        webhookPush: false
      },
      modelMap: {
        contextType: "xprofiler_log",
        pushType: "p2",
        webhookType: "dingtalk",
        webhookAddress: "",
        customRuleExpr: "",
        customRuleDesc: ""
      },
      optionMap: {
        contextType: [
          { value: "xprofiler_log", label: "X-Profiler 插件日志" },
          { value: "xtransit_notification", label: "X-Transit 通知信息" },
          { value: "system_log", label: "操作系统指标日志" },
          { value: "error_log", label: "Node.js 应用错误日志" }
        ],
        pushType: [
          { value: "p1", label: "P1 (致电)", disabled: true },
          { value: "p2", label: "P2 (短信)" },
          { value: "p3", label: "P3 (邮件通知)" },
          { value: "p4", label: "P4 (数据记录)" }
        ],
        webhookType: [{ value: "dingtalk", label: "钉钉推送" }],
        fastRules: [
          { value: "fast_rule_memory", label: "进程 Heap Memory 预警" },
          { value: "fast_rule_cpu", label: "进程 CPU 使用率预警" },
          { value: "fast_rule_gc", label: "进程 GC 开销过大预警" },
          {
            value: "fast_rule_expired_request",
            label: "进程慢响应预警 (超过 30s)"
          },
          {
            value: "fast_rule_illegal_request",
            label: "进程异常请求预警 (4xx 5xx 占比过高)"
          },
          { value: "fast_rule_os_memory", label: "系统可用 Memory 预警" },
          { value: "fast_rule_os_cpu", label: "系统整体 CPU 使用率预警" },
          { value: "fast_rule_disk_usage", label: "系统磁盘使用率预警" },
          {
            value: "fast_rule_error_log_content",
            label: "应用生成特定错误日志预警"
          },
          {
            value: "fast_rule_dependence_security_risk",
            label: "应用依赖的 Npm 模块安全漏洞预警"
          },
          { value: "fast_rule_coredump", label: "Coredump 文件生成预警" },
          {
            value: "fast_rule_node_process_exit",
            label: "Node.js 进程退出预警"
          }
        ]
      },
      placeholderMap: {
        dingtalk: "https://oapi.dingtalk.com/robot/send?access_token=xxxxxx"
      },
      editRule: false
    };
  },

  ...alarmConfigureModule
};
</script>

<style scoped>
.alarm-wrapper {
  background: #3392dc;
  color: white;
  width: 85px;
}

.alarm {
  text-align: center;
  padding: 4px 0 2px 0;
  font-size: 13px;
  margin-bottom: 10px;
}

.configure-wrapper {
  display: flex;
}

.label-group {
  width: calc(50% - 189px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.label {
  margin-right: 10px;
  color: #2c3e50;
}

.selector-group {
  width: calc(50% + 189px);
}

.selector {
  text-align: left;
  margin-left: 10px;
}

.input-group {
  width: calc(50% + 189px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.input {
  margin-left: 10px;
  width: 500px;
}

.webhook-group {
  width: calc(50% + 189px);
}

.webhook {
  text-align: left;
  margin-left: 10px;
}

.button-group {
  width: calc(50% + 189px);
  text-align: left;
}

.button {
  margin-left: 10px;
  /* font-size: 13px; */
}

.context-selector {
  text-align: left;
  width: 260px;
}
</style>