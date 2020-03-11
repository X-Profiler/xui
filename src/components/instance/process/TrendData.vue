<template>
  <div>
    <div class="title">{{ title }}</div>

    <div>
      <div style="text-align: center;">
        <x-loading :loading="loading" top="100" type="dot" size="middle"></x-loading>
      </div>

      <x-error-message v-if="loadError" :message="loadError" top="100"></x-error-message>

      <x-area
        v-if="!loading && !loadError"
        xAxis="time"
        :yAxis="yAxis"
        :data="areaData"
        :noDataText="noDataText"
      ></x-area>
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
</style>