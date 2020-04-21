<template>
  <div>
    <div class="section-title">GC 追踪分片解析</div>

    <div class="trace-content">
      <!-- trace panel -->
      <div class="trace-panel"></div>

      <!-- trace charts -->
      <div class="trace-charts">
        <div class="trace-group">
          <x-histogram
            class="trace-item"
            :data="pauseTimeWithStart"
            xAxis="timeFromStart"
            yAxis="pause"
            yAxisUnit="ms"
            yAxisZero
          ></x-histogram>

          <div class="trace-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import traceDetailModule from "@/javascripts/analytics/gc/TraceDetail";

export default {
  ...traceDetailModule
};
</script>

<style scoped>
.trace-content {
  display: flex;
  flex-direction: row-reverse;
}

.trace-panel {
  flex-shrink: 0;
  width: 350px;
}

.trace-charts {
  margin-top: 15px;
  flex-grow: 1;
}

.trace-group {
  display: flex;
  flex-wrap: wrap;
}

.trace-item {
  flex: 1 0 300px;
}
</style>