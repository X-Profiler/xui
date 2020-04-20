<template>
  <div>
    <!-- gc status overview -->
    <div class="section-title">GC 追踪结果概览</div>

    <div class="trace-group">
      <div class="trace-item">
        <div class="sub-title">GC 暂停时间占比 ( {{ formatPercentage(gcOccupy) }}% )</div>
        <div class="gc-total-wrapper">
          <div class="gc-occupy" :style="`width: ${gcOccupy}%;`"></div>
        </div>
      </div>

      <div class="trace-item">
        <div class="sub-title">GC 暂停时间分布</div>
      </div>

      <div class="trace-item">
        <div class="sub-title">GC 内存变化分布</div>
      </div>
    </div>
  </div>
</template>

<script>
import traceStatisticsModule from "@/javascripts/analytics/gc/statistics/TraceStatistics";

export default {
  ...traceStatisticsModule
};
</script>

<style scoped>
.trace-group {
  margin-top: 10px;
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
  margin-top: 10px;
  box-shadow: 2px 2px 6px rgba(132, 132, 132, 0.25) inset;
}

.gc-occupy {
  height: 100%;
  background-color: #884ea0;
  transition: all 0.5s ease-out;
}
</style>