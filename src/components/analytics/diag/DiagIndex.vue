<template>
  <div>
    <x-dashboard-title appName="诊断报告分析" :dashboardTitle="diagData.fileBasename" line></x-dashboard-title>

    <div class="diag-content">
      <div class="diag-loading">
        <x-loading :loading="file_loading" top="calc(40vh - 50px)" type="dot" size="large"></x-loading>
      </div>

      <x-error-message v-show="file_load_error" :message="file_load_error" top="calc(40vh - 57px)"></x-error-message>

      <transition name="slide-noward">
        <div v-if="!file_loading && !file_load_error" class="diag-detail">
          <!-- diag overview -->
          <x-overview :data="overviewData"></x-overview>

          <!-- diag tab -->
          <x-diag-tab class="diag-tab"></x-diag-tab>

          <!-- diag tab content -->
          <x-diag-content></x-diag-content>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import diagModule from "@/javascripts/analytics/diag/DiagIndex";
import xOverview from "@/components/analytics/Overview";
import xDiagTab from "@/components/analytics/diag/DiagTab";
import xDiagContent from "@/components/analytics/diag/DiagContent";

export default {
  components: {
    "x-overview": xOverview,
    "x-diag-tab": xDiagTab,
    "x-diag-content": xDiagContent
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

.diag-detail {
  margin-top: 30px;
}

.diag-tab {
  margin-top: 23px;
}
</style>