<template>
  <div>
    <div class="title">{{ title }}</div>

    <div>
      <div style="text-align: center;margin-top: 10px;">
        <x-loading :loading="loading" top="100" type="dot" size="middle"></x-loading>
      </div>

      <x-error-message v-if="loadError" :message="loadError" top="100"></x-error-message>

      <div v-if="!loading && !loadError">
        <x-area
          xAxis="time"
          ref="area"
          :yAxis="yAxis"
          :data="areaData"
          :noDataText="noDataText"
          @linkage="linkage"
          @hidden="hidden"
        ></x-area>

        <div class="chart-label">
          <div class="chart-label-group" v-for="(axis, index) in yAxis" :key="index">
            <div class="label-icon"></div>
            <div class="label-value">{{axis}}</div>
          </div>
        </div>
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
        trendData: []
      };
    }
  },
  trendModule
);

export default trendData;
</script>

<style scoped>
.title {
  font-size: 15px;
  font-weight: bold;
}

.chart-label {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-label-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.label-icon {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: black;
}

.label-value {
  margin: 0 25px 0 5px;
}
</style>