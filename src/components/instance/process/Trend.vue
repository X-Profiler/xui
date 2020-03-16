<template>
  <div>
    <!-- loading -->
    <div style="text-align: center">
      <x-loading :loading="xprofiler_processes_loading" :top="300" size="small" type="dot"></x-loading>
    </div>

    <!-- error -->
    <x-error-message
      v-show="xprofiler_processes_load_error"
      :message="xprofiler_processes_load_error"
      top="calc(35vh - 50px)"
    ></x-error-message>

    <!-- show trend -->
    <transition name="slide-noward">
      <div v-if="!xprofiler_processes_loading && !xprofiler_processes_load_error">
        <!-- trend panel -->
        <div class="panel" :style="'background-color: ' + color">
          <div class="line-group">
            <div class="title">PID: {{ proc.pid }}</div>
            <div class="action">
              <div
                class="bt-wrapper"
                v-for="(bt, index) in bts"
                :key="index"
                @mouseover="mouseover(bt)"
                @mouseout="mouseout(bt)"
              >
                <Button long :type="bt.ghost ? 'default' : 'text'" :ghost="bt.ghost">
                  <div :ref="bt.value">{{ bt.label }}</div>
                </Button>
              </div>
            </div>
          </div>

          <div class="cmd">{{ proc.cmd }}</div>
        </div>

        <!-- heap & cpu detail -->
        <div class="detail" style="margin-top: 20px;">
          <x-trend-data
            class="trend-data"
            v-for="(dt, index) in dts1"
            :key="index"
            :ref="dt.value"
            :type="dt.value"
            :title="dt.label"
            @linkage="linkage"
            @hidden="hidden"
          ></x-trend-data>
        </div>

        <div class="interval-section"></div>

        <!-- heap composed -->
        <div class="detail">
          <x-trend-data
            class="trend-data-circle-line"
            v-for="(dt, index) in dts2"
            :key="index"
            :ref="dt.value"
            :type="dt.value"
            :title="dt.label"
            @linkage="linkage"
            @hidden="hidden"
          ></x-trend-data>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import trendModule from "../../../javascripts/instance/process/Trend";
import xTrendData from "./TrendData";

const trendData = Object.assign(
  {
    components: {
      "x-trend-data": xTrendData
    },

    data() {
      return {
        bts: [
          { label: "CPU Profile", value: "cpuprofile", ghost: true },
          { label: "Heap Profile", value: "heapprofile", ghost: true },
          { label: "GC 追踪", value: "gcprofile", ghost: true },
          { label: "堆快照", value: "heapsnapshot", ghost: true },
          { label: "Node.js 实时诊断", value: "diag", ghost: true }
        ],

        dts1: [
          { label: "堆内存趋势", value: "heapTrend" },
          { label: "CPU 趋势", value: "cpuTrend" }
        ],

        dts2: [{ label: "堆空间组成", value: "heapSpaceTrend" }]
      };
    }
  },
  trendModule
);

export default trendData;
</script>

<style scoped>
.panel {
  width: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

.line-group {
  display: flex;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  padding: 10px 15px 0 15px;
  flex-basis: 200px;
}

.action {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  flex-wrap: wrap;
}

.bt-wrapper {
  margin-top: 10px;
  padding: 0 5px;
  flex-grow: 1;
  max-width: 160px;
}

.cmd {
  font-size: 12px;
  padding: 10px 10px;
  color: white;
  padding: 5px 15px 10px 15px;
  word-wrap: break-word;
  word-break: break-all;
}

.detail {
  display: flex;
  flex-wrap: wrap;
}

.trend-data {
  min-width: 300px;
  min-height: 300px;
  flex: 1 0 300px;
}

.trend-data-circle-line {
  width: 100%;
}

.interval-section {
  margin: 15px 0;
  border-bottom: 1px dashed #e8eaec;
}
</style>