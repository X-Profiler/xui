<template>
  <div>
    <div class="title-group">
      <div class="title">{{ title }}</div>
      <transition name="slide-noward">
        <div v-if="commonData.showStatus && trendStatus.status !== undefined" class="status-group">
          <div class="status" :style="statusLabelStyle">{{ trendStatus.statusLabel }}</div>
          <div class="tip">{{ trendStatus.statusTip }}</div>
        </div>
      </transition>
    </div>

    <div>
      <div style="text-align: center;margin-top: 13px;">
        <x-loading :loading="loading" top="100" type="dot" size="middle"></x-loading>
      </div>

      <x-error-message v-if="loadError" :message="loadError" top="100"></x-error-message>

      <div v-if="!loading && !loadError" class="charts">
        <!-- pie chart -->
        <x-pie
          v-if="solid"
          class="pie"
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
          :solid="solid"
          @linkage="linkage"
          @hidden="hidden"
          @status="updateStatus"
        ></x-area>
      </div>
    </div>
  </div>
</template>

<script>
import trendModule from "../../../javascripts/instance/process/TrendData";

const trendData = Object.assign(
  {
    props: {
      type: String,
      title: String,
      solid: Boolean
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
    }
  },
  trendModule
);

export default trendData;
</script>

<style scoped>
.title-group,
.status-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.title {
  font-size: 15px;
  font-weight: bold;
}

.status {
  margin-left: 13px;
  font-size: 12px;
  color: #fff;
  padding: 2px 5px;
  transition: all 0.1s ease;
}

.tip {
  margin-left: 10px;
  font-size: 13px;
  color: #515a6e;
}

.charts {
  display: flex;
  flex-wrap: wrap;
}

.pie {
  flex-basis: 315px;
}

.main-chart {
  flex-basis: 500px;
  flex-grow: 1;
}
</style>