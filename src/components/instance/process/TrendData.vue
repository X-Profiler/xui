<template>
  <div>
    <div class="title-group">
      <div class="title">{{ title }}</div>
      <transition name="slide-noward">
        <div v-if="commonData.showStatus && trendStatus.status" class="status-group">
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

      <div v-if="!loading && !loadError">
        <x-area
          xAxis="time"
          ref="area"
          :data="chartData"
          :yAxis="commonData.yAxis"
          :yAxisUnit="commonData.yAxisUnit"
          :noDataText="commonData.noDataText"
          :showStatus="commonData.showStatus"
          @linkage="linkage"
          @hidden="hidden"
          @status="checkStatus"
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
      title: String
    },

    data() {
      return {
        loading: false,
        loadError: undefined,
        trendData: [],
        trendStatus: {},
        limit: undefined
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
</style>