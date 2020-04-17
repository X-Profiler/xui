<template>
  <div v-show="!logs_loading && !logs_load_error">
    <x-table :columns="columns" :data="errors" noDataText="当前应用暂无错误信息" no-data-head border stribe2>
      <!-- occured time -->
      <template v-slot:occuredTime="{ row }">
        <div class="error-content">
          <code>{{ row.date}}</code>
        </div>
        <div class="error-content" style="margin-top:5px;">
          <code>{{ row.time}}</code>
        </div>
      </template>

      <!-- error type -->
      <template v-slot:errorType="{ row }">
        <code class="error-content">{{ row.type }}</code>
      </template>

      <!-- error message -->
      <template v-slot:errorDetail="{ row }">
        <div class="error-content">
          <div v-for="(line, index) in row.stack" :key="index">
            <code v-if="index === 0">{{ line }}</code>
            <code v-else style="margin-left: 15px;">{{ line }}</code>
          </div>
          <div v-if="row.extra.length">
            <div v-for="(line, index) in row.extra" :key="index">
              <code>{{ line }}</code>
            </div>
          </div>
        </div>
      </template>
    </x-table>

    <div v-if="totaLogCount" class="pagination">
      <Page
        :total="totaLogCount"
        :page-size="pageSize"
        :current="currentPage"
        size="small"
        show-elevator
        @on-change="changeLogPage"
      />
    </div>
  </div>
</template>

<script>
import errorLogsModule from "@/javascripts/instance/errors/ErrorLogs";

export default {
  data() {
    return {
      currentPage: undefined,
      pageSize: 20,
      totaLogCount: 0,
      columns: [
        {
          title: "发生时间",
          value: "occuredTime",
          align: "center",
          width: 120
        },
        { title: "错误类型", value: "errorType", align: "center", width: 150 },
        { title: "详细错误堆栈", value: "errorDetail" }
      ],
      nessaryQueryArgs: ["tab", "agentId", "file"]
    };
  },

  ...errorLogsModule
};
</script>

<style scoped>
.error-content {
  font-size: 12px;
}
</style>