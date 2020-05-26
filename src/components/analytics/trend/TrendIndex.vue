<template>
  <div>
    <x-dashboard-title appName="进程数据趋势" :dashboardTitle="trendData.fileBasename" line></x-dashboard-title>

    <div class="trend-content">
      <div class="trend-loading">
        <x-loading :loading="file_loading" top="calc(40vh - 50px)" type="dot" size="large"></x-loading>
      </div>

      <x-error-message v-show="file_load_error" :message="file_load_error" top="calc(40vh - 57px)"></x-error-message>

      <transition name="slide-noward">
        <div v-if="!file_loading && !file_load_error">
          <x-trend :trendMap="file_data" disable-panel></x-trend>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import trendModule from "@/javascripts/analytics/trend/TrendIndex";
import xTrend from "@/components/instance/process/Trend";

export default {
  components: {
    "x-trend": xTrend
  },

  ...trendModule
};
</script>

<style>
.trend-content {
  margin-top: 15px;
}

.trend-loading {
  text-align: center;
}
</style>