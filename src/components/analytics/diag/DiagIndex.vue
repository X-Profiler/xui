<template>
  <div>
    <x-dashboard-title appName="诊断报告分析" :dashboardTitle="diagData.fileBasename" line></x-dashboard-title>

    <div class="diag-content">
      <div class="diag-loading">
        <x-loading :loading="file_loading" top="calc(40vh - 50px)" type="dot" size="large"></x-loading>
      </div>

      <x-error-message v-show="file_load_error" :message="file_load_error" top="calc(40vh - 57px)"></x-error-message>

      <div v-if="!file_loading && !file_load_error">
        <x-overview :data="overviewData"></x-overview>
      </div>
    </div>
  </div>
</template>

<script>
import diagModule from "@/javascripts/analytics/diag/DiagIndex";
import xOverview from "@/components/analytics/Overview";

export default {
  components: {
    "x-overview": xOverview
  },

  ...diagModule
};
</script>

<style scoped>
.diag-content {
  margin-top: 15px;
}

.diag-loading {
  text-align: center;
}
</style>