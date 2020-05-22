<template>
  <div>
    <div class="trend-title-group">
      <div class="trend-title system-title">
        {{ title }}
        <span class="extra" v-if="extra">({{ extra }})</span>
      </div>
    </div>

    <div>
      <div style="text-align: center;">
        <x-loading :loading="loading" top="100" type="dot" size="middle"></x-loading>
      </div>

      <x-error-message v-if="loadError" :message="loadError" top="100"></x-error-message>

      <transition name="slide-noward">
        <div v-if="!loading && !loadError" class="charts">
          <!-- pie chart -->

          <!-- main chart -->
          <x-area
            xAxis="time"
            ref="area"
            class="main-chart"
            :data="chartData"
            :yAxis="commonData.yAxis"
            :yAxisUnit="commonData.yAxisUnit"
            :noDataText="commonData.noDataText"
            :fixedTip="commonData.fixedTip"
            :solid="solid"
            @linkage="linkage"
            @hidden="hidden"
            @broadcast="broadcast"
          ></x-area>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import systemTrendModule from "@/javascripts/instance/system/SystemTrend";

export default {
  props: {
    type: String,
    title: String,
    solid: Boolean,
    duration: Number
  },

  data() {
    return {
      loading: false,
      loadError: undefined,
      trendData: [],
      extra: undefined,
      yAxis: []
    };
  },
  ...systemTrendModule
};
</script>

<style scoped>
.charts {
  margin-top: 5px;
}

.system-title {
  text-align: center;
  font-size: 13px;
  width: 100%;
}

.extra {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
}
</style>