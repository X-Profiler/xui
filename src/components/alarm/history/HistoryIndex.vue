<template>
  <div class="history">
    <div class="header">
      <span>规则</span>
      <code>&nbsp;{{ historyData.expression }}&nbsp;</code>
      <span>存在以下</span>
      <code>&nbsp;{{ totalCount }}&nbsp;</code>
      <span>条告警历史记录</span>
    </div>
  </div>
</template>

<script>
import historyModule from "@/javascripts/alarm/history/HistoryIndex";

export default {
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
</style>