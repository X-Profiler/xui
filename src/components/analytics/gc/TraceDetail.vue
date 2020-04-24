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
            @broadcast="broadcast('histogram', arguments)"
            @linkage="linkage('histogram', arguments)"
            @hidden="hidden('histogram')"
          ></x-histogram>

          <!-- heap memory -->
          <x-area
            ref="area"
            class="trace-item"
            :height="330"
            :right="30"
            :bottom="27"
            :data="heapTrendWithStart"
            xAxis="index"
            :yAxis="['heap_size']"
            :xAxisScaleCount="5"
            yAxisUnit="MB"
            @broadcast="broadcast('area', arguments)"
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
            @broadcast="broadcast('histogram2', arguments)"
            @linkage="linkage('histogram2', arguments)"
            @hidden="hidden('histogram2')"
          ></x-histogram>

          <!-- spaces status -->
          <x-space-scatter
            ref="scatter"
            class="trace-item"
            :data="spaceTrendWithStart.list"
            xAxis="index"
            :yAxis="spaceTrendWithStart.spaces"
            yAxisUnit="MB"
            yAxisZero
            @broadcast="broadcast('scatter', arguments)"
            @linkage="linkage('scatter', arguments)"
            @hidden="hidden('scatter')"
          ></x-space-scatter>
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
  width: 260px;
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