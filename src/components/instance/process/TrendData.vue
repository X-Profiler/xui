<template>
  <div>
    <div class="trend-title-group">
      <div class="trend-title">{{ title }}</div>
      <transition name="slide-noward">
        <div
          v-if="commonData.showStatus && trendStatus.status !== undefined"
          class="trend-status-group"
        >
          <div class="trend-status" :style="statusLabelStyle">{{ trendStatus.statusLabel }}</div>
          <div class="trend-tip">{{ trendStatus.statusTip }}</div>
        </div>
      </transition>
    </div>

    <div>
      <div style="text-align: center;margin-top: 13px;">
        <x-loading :loading="loading" top="100" type="dot" size="middle"></x-loading>
      </div>

      <x-error-message v-if="loadError" :message="loadError" top="100"></x-error-message>

      <transition name="slide-noward">
        <div v-if="!loading && !loadError" class="charts">
          <!-- pie chart -->
          <x-pie
            v-if="solid"
            class="circle"
            :data="selectedData"
            :yAxis="commonData.yAxis"
            :yAxisUnit="commonData.yAxisUnit"
          ></x-pie>

          <!-- main chart -->
          <x-area
            xAxis="time"
            ref="area"
            class="main-chart"
            :data="chartData"
            :yAxis="commonData.yAxis"
            :yAxisUnit="commonData.yAxisUnit"
            :noDataText="commonData.noDataText"
            :showStatus="commonData.showStatus"
            :fixedTip="commonData.fixedTip"
            :solid="solid"
            @linkage="linkage"
            @hidden="hidden"
            @status="updateStatus"
            @broadcast="broadcast"
          ></x-area>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import trendModule from "@/javascripts/instance/process/TrendData";

export default {
  props: {
    type: String,
    title: String,
    solid: Boolean,
    duration: Number,
    data: {
      required: false,
      type: Object
    }
  },

  data() {
    return {
      loading: false,
      loadError: undefined,
      trendData: [],
      trendStatus: {},
      limit: undefined,
      selectedData: {}
    };
  },

  ...trendModule
};
</script>

<style scoped>
.charts {
  display: flex;
  flex-wrap: wrap;
}

.circle {
  flex-basis: 315px;
}

.main-chart {
  flex-basis: 500px;
  flex-grow: 1;
}
</style>