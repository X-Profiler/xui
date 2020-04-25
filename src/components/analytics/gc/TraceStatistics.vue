<template>
  <div>
    <div class="section-title">GC 追踪全貌概览</div>

    <div class="trace-group">
      <div class="trace-item">
        <div class="sub-title">GC 暂停时间占比 ( {{ formatPercentage(gcOccupy) }}% )</div>
        <div class="gc-total-wrapper">
          <div class="gc-occupy" :style="`width: ${gcOccupy}%;`"></div>
        </div>
      </div>

      <div class="trace-item">
        <div class="sub-title">GC 暂停时间分布 (ms)</div>
        <x-mini-scatter class="mini-scatter" :data="pauseTime" dot-color="#3B93D8"></x-mini-scatter>
      </div>

      <div class="trace-item">
        <div class="sub-title">GC 内存变化分布 (MB)</div>
        <x-mini-scatter class="mini-scatter" :data="memoryChange" dot-color="#ff9900"></x-mini-scatter>
      </div>
    </div>
  </div>
</template>

<script>
import traceStatisticsModule from "@/javascripts/analytics/gc/TraceStatistics";

export default {
  ...traceStatisticsModule
};
</script>

<style scoped>
.trace-group {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}

.trace-item {
  text-align: center;
  flex: 1 0 300px;
}

.sub-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.gc-total-wrapper {
  height: 25px;
  background-color: #eff1f4;
  width: 60%;
  display: inline-block;
  margin-top: 23px;
  box-shadow: 2px 2px 6px rgba(132, 132, 132, 0.25) inset;
}

.gc-occupy {
  height: 100%;
  background-color: #6a5acd;
  transition: all 0.5s ease-out;
}

.mini-scatter {
  margin-top: 10px;
  width: calc(60% + 32px);
  display: inline-block;
}
</style>