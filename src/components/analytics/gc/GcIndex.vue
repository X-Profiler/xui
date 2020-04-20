<template>
  <div>
    <x-dashboard-title appName="GC 追踪日志分析" :dashboardTitle="gcData.fileBasename" line></x-dashboard-title>

    <div class="gc-content">
      <div class="gc-loading">
        <x-loading :loading="file_loading" top="calc(40vh - 50px)" type="dot" size="large"></x-loading>
      </div>

      <x-error-message v-show="file_load_error" :message="file_load_error" top="calc(40vh - 57px)"></x-error-message>

      <transition name="slide-noward">
        <div v-if="!file_loading && !file_load_error">
          <!-- gc overview -->
          <x-overview :data="overviewData"></x-overview>

          <!-- trace statistics -->
          <x-trace-statistics class="trace-statistics"></x-trace-statistics>

          <!-- trace detail -->
          <x-trace-detail class="trace-detail"></x-trace-detail>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import gcModule from "@/javascripts/analytics/gc/GcIndex";
import xOverview from "@/components/analytics/Overview";
import xTraceStatistics from "@/components/analytics/gc/TraceStatistics";
import xTraceDetail from "@/components/analytics/gc/TraceDetail";

export default {
  components: {
    "x-overview": xOverview,
    "x-trace-statistics": xTraceStatistics,
    "x-trace-detail": xTraceDetail
  },

  ...gcModule
};
</script>

<style scoped>
.gc-content {
  margin-top: 15px;
}

.gc-loading {
  text-align: center;
}

.trace-statistics {
  margin-top: 19px;
}

.trace-detail {
  margin-top: 25px;
}
</style>