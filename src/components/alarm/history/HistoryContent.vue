<template>
  <div>content</div>
</template>

<script>
import historyContentModule from "@/javascripts/alarm/history/HistoryContent";

export default {
  data() {
    return {
      currentPage: undefined,
      pageSize: 10,
      totaHistoryCount: 0,
      nessaryQueryArgs: ["alarm-history", "historyData"]
    };
  },

  ...historyContentModule
};
</script>>