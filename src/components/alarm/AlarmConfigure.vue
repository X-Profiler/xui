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
      :style="index !== 0 ? 'margin-top: 15px;' : ''"
    >
      <!-- label -->
      <div class="label-group">
        <div class="label">{{ cfg.label }}</div>
      </div>

      <!-- selector -->
      <div v-if="cfg.type === 'selector'" class="selector-group">
        <div class="selector">
          <Select v-model="modelMap[cfg.value]" class="agent-selector context-selector">
            <Option
              v-for="option in optionMap[cfg.value]"
              :value="option.value"
              :key="option.value"
              :disabled="option.disabled"
            >{{ option.label }}</Option>
          </Select>
        </div>
      </div>

      <!-- webhook -->
      <div v-if="cfg.type === 'webhook'" class="webhook-group">
        <div class="webhook">
          <Checkbox v-model="checkboxMap[cfg.value]">
            <span style="margin-left: 5px;">启用</span>
          </Checkbox>
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
          value: "webhookType"
        }
      ],
      checkboxMap: {
        webhookType: false
      },
      modelMap: {
        contextType: "xprofiler_log",
        pushType: "p2",
        webhookType: "dingtalk"
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
        webhookType: [{ value: "dingtalk", label: "钉钉推送" }]
      }
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
}

.configure-wrapper {
  margin-top: 5px;
  display: flex;
}

.label-group {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.label {
  padding-right: 9px;
  color: #2c3e50;
}

.selector-group {
  width: 50%;
}

.selector {
  text-align: left;
  padding-left: 9px;
}

.webhook-group {
  width: 50%;
}

.webhook {
  text-align: left;
  padding-left: 9px;
}

.context-selector {
  text-align: left;
  width: 260px;
}
</style>