<template>
  <div>
    <x-table :columns="columns" :data="rules" noDataText="应用下暂无已配置告警规则" no-data-head>
      <!-- push type -->
      <template v-slot:pushType="{ row }">
        <div
          :class="'rule-content' + (row.disabled ? ' rule-disabled' : '')"
        >{{ formatPushType(row.pushType) }}</div>
      </template>

      <!-- context type -->
      <template v-slot:contextType="{ row }">
        <div
          :class="'rule-content' + (row.disabled ? ' rule-disabled' : '')"
        >{{ formatContextType(row.contextType) }}</div>
      </template>

      <!-- expression -->
      <template v-slot:expression="{ row }">
        <code :class="row.disabled ? ' rule-disabled' : ''">{{ row.expression }}</code>
      </template>

      <!-- alarm content -->
      <template v-slot:alarmContent="{ row }">
        <div :class="'rule-content' + (row.disabled ? ' rule-disabled' : '')">{{ row.alarmContent }}</div>
      </template>

      <!-- alarm list -->
      <template v-slot:alarms="{ row }">
        <Badge
          class="setted-rule"
          :count="row.alarmCount"
          overflow-count="999"
          :type="row.disabled ? 'normal' : 'error'"
        >
          <Button
            type="info"
            ghost
            size="small"
            class="button"
            :disabled="row.disabled"
            @click="showAlarmList(row)"
          >告警历史</Button>
        </Badge>
      </template>

      <!-- operations -->
      <template v-slot:operations="{ row }">
        <div class="operations">
          <Button
            type="info"
            ghost
            size="small"
            class="button"
            :disabled="row.disabled"
            @click="openContactsModal(row)"
          >配置联系人</Button>

          <x-dropdown
            :ref="`dropdown-${row.index}`"
            v-if="!row.disabled"
            :transformY="8"
            color="#2376b7"
            :minWidth="85"
          >
            <div slot="title" class="dropdown-title rule-label">更多</div>

            <div slot="content">
              <div
                v-for="(li, index) in operations"
                :key="index"
                class="x-dropdown-li operation-wrapper"
                @click="operateRule(li.value, row)"
              >
                <div class="operation">{{ li.label }}</div>
              </div>
            </div>
          </x-dropdown>

          <Button
            v-else
            class="button"
            size="small"
            type="success"
            style="width:42px"
            @click="operateRule('enable', row)"
          >启用</Button>
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
      ],
      operations: [
        { label: "编辑", value: "edit" },
        { label: "删除", value: "delete" },
        { label: "禁用", value: "disable" }
      ],
      rules: []
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

.operation-wrapper {
  justify-content: center;
  user-select: none;
}

.operation {
  flex-shrink: 0;
}

.rule-label {
  color: #2376b7;
}

.rule-disabled {
  color: #c5c8ce;
}
</style>