<template>
  <div>
    <x-table :columns="columns" :data="rules" noDataText="应用下暂无已配置告警规则" no-data-head>
      <!-- push type -->
      <template v-slot:pushType="{ row }">
        <div class="rule-content">{{ formatPushType(row.pushType) }}</div>
      </template>

      <!-- context type -->
      <template v-slot:contextType="{ row }">
        <div class="rule-content">{{ formatContextType(row.contextType) }}</div>
      </template>

      <!-- expression -->
      <template v-slot:expression="{ row }">
        <code>{{ row.expression }}</code>
      </template>

      <!-- alarm content -->
      <template v-slot:alarmContent="{ row }">
        <div class="rule-content">{{ row.alarmContent }}</div>
      </template>

      <!-- alarm list -->
      <template v-slot:alarms="{ row }">
        <Button type="info" ghost size="small" class="button" @click="showAlarmList(row)">告警历史</Button>
      </template>

      <!-- operations -->
      <template v-slot:operations="{ row }">
        <div class="operations">
          <Button type="info" ghost size="small" class="button" @click="showAlarmList(row)">设置联系人</Button>

          <x-dropdown v-if="!row.disabled" :transformY="8" color="#2376b7">
            <div slot="title" class="dropdown-title xprofiler-status-label">更多</div>

            <div slot="content">
              <!-- <div
                v-for="(li, index) in child.children"
                :key="index"
                class="xprofiler-logdir-group x-dropdown-li"
              >
                <div class="dropdown-dot" :style="'background-color: ' + li.color + ';'"></div>
                <div v-html="li.label"></div>
              </div>-->
            </div>
          </x-dropdown>
        </div>
      </template>
    </x-table>
  </div>
</template>

<script>
import settedRulesModule from "@/javascripts/alarm/SettedRules";

export default {
  data() {
    return {
      columns: [
        { title: "推送级别", value: "pushType", width: 130, left: 20 },
        { title: "上下文类型", value: "contextType", width: 154 },
        { title: "阈值表达式", value: "expression", width: 300 },
        { title: "告警推送内容", value: "alarmContent" },
        { title: "已触发告警", value: "alarms", width: 105, align: "center" },
        { title: "操作", value: "operations", width: 185, align: "center" }
      ]
    };
  },

  ...settedRulesModule
};
</script>

<style scoped>
.rule-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #3d4350;
}

.button {
  font-size: 12px;
}

.operations {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.xprofiler-status-label {
  color: #2376b7;
}
</style>