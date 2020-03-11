<template>
  <div>
    <div class="title">{{ title }}</div>

    <div>
      <div style="text-align: center;">
        <x-loading :loading="process_trend_loading" top="100" type="dot" size="middle"></x-loading>
      </div>

      <x-error-message
        v-if="process_trend_load_error"
        :message="process_trend_load_error"
        top="100"
      ></x-error-message>

      <x-area
        v-if="!process_trend_loading && !process_trend_load_error"
        xAxis="time"
        :yAxis="yAxis"
        :data="areaData"
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