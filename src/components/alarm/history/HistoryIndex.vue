<template>
  <div class="history">
    <!-- header -->
    <div class="header">
      <span>规则</span>
      <code>&nbsp;{{ historyData.expression }}&nbsp;</code>
      <span>存在以下</span>
      <code>&nbsp;{{ totalCount }}&nbsp;</code>
      <span>条告警历史记录</span>
    </div>

    <!-- content -->
    <div class="content">
      <x-loading :loading="history_loading" type="dot" size="middle" top="calc(40vh)"></x-loading>

      <x-error-message
        v-show="history_load_error"
        :message="history_load_error"
        top="calc(40vh - 22px)"
      ></x-error-message>

      <x-history-content v-show="!history_loading && !history_load_error"></x-history-content>
    </div>
  </div>
</template>

<script>
import historyModule from "@/javascripts/alarm/history/HistoryIndex";
import xHistoryContent from "@/components/alarm/history/HistoryContent";

export default {
  components: {
    "x-history-content": xHistoryContent
  },

  data() {
    return {
      totalCount: 0
    };
  },

  ...historyModule
};
</script>

<style scoped>
.history {
  padding: 10px 20px;
}

.header {
  font-weight: bold;
  padding: 10px 0;
}

.content {
  text-align: center;
}
</style>