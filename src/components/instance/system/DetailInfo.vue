<template>
  <div>
    <div class="section-title">系统信息周期详情</div>

    <div class="charts">
      <div v-for="(charts, index) in chartGroup" :key="index">
        <div class="system-detail" :style="index === 0 ? 'margin-top: 10px;': 'margin-top: 20px;'">
          <x-system-trend
            class="system-trend-data"
            v-for="(dt, index) in charts"
            :key="index"
            :ref="dt.value"
            :type="dt.value"
            :title="dt.label"
            :solid="dt.solid"
            @linkage="linkage"
            @hidden="hidden"
            @broadcast="broadcast"
          ></x-system-trend>
        </div>

        <div v-if="index !== chartGroup.length - 1" class="interval-section"></div>
      </div>
    </div>
  </div>
</template>

<script>
import detailInfoModule from "@/javascripts/instance/system/DetailInfo";
import xSystemTrend from "@/components/instance/system/SystemTrend";

export default {
  components: {
    "x-system-trend": xSystemTrend
  },

  data() {
    return {
      chartGroup: [
        [
          { label: "系统 CPU 趋势", value: "osCpuTrend" },
          { label: "系统 Memory 趋势", value: "osMemoryTrend" }
        ],
        [
          { label: "系统 Load 负载", value: "loadTrend" },
          { label: "Node.js 进程数", value: "nodeCountTrend" }
        ],
        [
          { label: "整体 GC 状态", value: "osGcTrend" },
          { label: "磁盘使用率", value: "diskUsageTrend" }
        ],
        [
          { label: "QPS 趋势", value: "qpsTrend" },
          { label: "HTTP 响应时间", value: "httpResponseTrend" }
        ]
      ]
    };
  },

  ...detailInfoModule
};
</script>

<style scoped>
.charts {
  margin-top: 20px;
}

.system-detail {
  display: flex;
  flex-wrap: wrap;
}

.system-trend-data {
  min-width: 300px;
  min-height: 315px;
  flex: 1 0 300px;
}

.interval-section {
  margin: 20px 0;
  border-bottom: 1px dashed #e8eaec;
}
</style>