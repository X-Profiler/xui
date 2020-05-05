<template>
  <div class="history-content">
    <x-table :columns="columns" :data="history" noDataText="规则下暂无告警历史记录" no-data-head stribe>
      <!-- alarm time -->
      <template v-slot:time="{ row }">
        <div class="alarm-content">{{ formatTime(row.time) }}</div>
      </template>

      <!-- context type -->
      <template v-slot:contextType="{ row }">
        <div class="alarm-content">{{ formatContextType(row.contextType) }}</div>
      </template>

      <!-- app info -->
      <template v-slot:appInfo="{ row }">
        <div class="alarm-content">{{ row.appInfo }}</div>
      </template>

      <!-- agent id -->
      <template v-slot:agentId="{ row }">
        <div class="alarm-content">{{ row.agentId }}</div>
      </template>

      <!-- alarm content -->
      <template v-slot:alarmContent="{ row }">
        <div class="alarm-content">{{ row.alarmContent }}</div>
      </template>

      <!-- alarm operation -->
      <template v-slot:operation="{ row }">
        <Button type="info" size="small" class="button" :to="row.detailPath" target="_blank">查看详情</Button>
      </template>
    </x-table>

    <!-- pagination -->
    <div v-if="totaHistoryCount" class="pagination">
      <Page
        :total="totaHistoryCount"
        :page-size="pageSize"
        :current="currentPage"
        size="small"
        show-elevator
        @on-change="changeHistoryPage"
      />
    </div>
  </div>
</template>

<script>
import historyContentModule from "@/javascripts/alarm/history/HistoryContent";

export default {
  data() {
    return {
      currentPage: undefined,
      pageSize: 50,
      totaHistoryCount: 0,
      nessaryQueryArgs: ["alarm-history", "historyData"],
      columns: [
        { title: "告警时间", value: "time", width: 165 },
        { title: "上下文类型", value: "contextType", width: 155 },
        // { title: "应用 ID", value: "appInfo", width: 125 },
        { title: "实例 ID", value: "agentId", width: 250 },
        { title: "消息内容", value: "alarmContent" },
        { title: "操作", value: "operation", align: "center", width: 110 }
      ],
      history: []
    };
  },

  ...historyContentModule
};
</script>

<style scoped>
.history-content {
  padding: 10px 0;
}

.alarm-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #3d4350;
}

.button {
  font-size: 13px;
}
</style>

