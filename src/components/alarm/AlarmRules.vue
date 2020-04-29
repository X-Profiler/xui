<template>
  <div>
    <!-- sub title -->
    <div class="alarm-wrapper">
      <div class="section-title alarm">已配置规则项</div>
    </div>

    <div>
      <!-- loading -->
      <x-loading :loading="rules_loading" type="dot" size="middle" top="calc(40vh - 105px)"></x-loading>

      <!-- error -->
      <x-error-message
        v-show="rules_load_error"
        :message="rules_load_error"
        top="calc(50vh - 360px)"
      ></x-error-message>

      <!-- show rules -->
      <!-- <x-members class="members" v-if="!rules_loading && !rules_load_error"></x-members> -->
      <!-- <x-table :columns="columns" :data="[]" noDataText="应用下暂无已配置告警规则" stribe2 no-data-head></x-table> -->
    </div>
  </div>
</template>

<script>
import alarmRuleModule from "@/javascripts/alarm/AlarmRules";

export default {
  data() {
    return {
      columns: [
        { title: "推送级别", value: "pushType", width: 130 },
        { title: "上下文类型", value: "contextType", width: 150 },
        { title: "阈值表达式", value: "expression", width: 260 },
        { title: "告警推送内容", value: "alarmContent" },
        { title: "已有告警", value: "alarms", width: 100 },
        { title: "操作", value: "action", width: 175, align: "center" }
      ]
    };
  },

  ...alarmRuleModule
};
</script>

<style scoped>
.alarm-wrapper {
  background: #3392dc;
  color: white;
  width: 90px;
}

.alarm {
  text-align: center;
  padding: 4px 0 2px 0;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>