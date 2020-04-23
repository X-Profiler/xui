<template>
  <div>
    <div class="section-title">GC 追踪分片解析</div>

    <div class="trace-content">
      <!-- trace panel -->
      <div class="trace-panel"></div>

      <!-- trace charts -->
      <div class="trace-charts">
        <div class="trace-group">
          <!-- pause time -->
          <x-histogram
            ref="histogram"
            class="trace-item"
            :data="pauseTimeWithStart"
            xAxis="index"
            yAxis="pause"
            yAxisUnit="ms"
            yAxisZero
            @linkage="linkage('histogram', arguments)"
            @hidden="hidden('histogram')"
          ></x-histogram>

          <!-- heap memory -->
          <x-area
            ref="area"
            class="trace-item"
            :height="400"
            :right="41"
            :bottom="27"
            :data="heapTrendWithStart"
            xAxis="index"
            :yAxis="['heap_size']"
            :xAxisScaleCount="5"
            yAxisUnit="MB"
            @linkage="linkage('area', arguments)"
            @hidden="hidden('area')"
          ></x-area>
        </div>

        <div class="trace-group">
          <!-- memory change -->
          <x-histogram
            ref="histogram2"
            class="trace-item"
            :data="pauseTimeWithStart"
            xAxis="index"
            yAxis="changeAbs"
            yAxisUnit="MB"
            yAxisZero
            @linkage="linkage('histogram2', arguments)"
            @hidden="hidden('histogram2')"
          ></x-histogram>

          <!-- spaces status -->
          <x-area
            ref="scatter"
            class="trace-item"
            :height="400"
            :right="41"
            :bottom="27"
            :data="heapTrendWithStart"
            xAxis="index"
            :yAxis="['heap_size']"
            :xAxisScaleCount="5"
            yAxisUnit="MB"
            @linkage="linkage('scatter', arguments)"
            @hidden="hidden('scatter')"
          ></x-area>
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
  width: 300px;
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