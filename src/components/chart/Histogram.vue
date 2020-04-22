<template>
  <div ref="histogram">
    <!-- chartip -->
    <x-chartip ref="chartip" no-arrow>
      <div
        slot="header"
        class="chartip-header"
        :style="`background-color: ${chartipData.color};color: white`"
      >
        <div>{{ chartipTitle }}</div>
      </div>
      <div slot="content" class="chartip-content">
        <div style="margin-top:2px;">
          <div class="chartip-key">距离进程启动时间:</div>
          <div class="chartip-key">本次 GC 暂停时间:</div>
          <div class="chartip-key">堆内存大小变化:</div>
        </div>
        <div style="margin: 2px 0 0 23px;">
          <div class="chartip-value">{{ formatChartipTime(chartipData.timeFromStart) }}</div>
          <div class="chartip-value">{{ chartipData.pause }}ms</div>
          <div class="chartip-value">{{ chartipData.change }}MB</div>
        </div>
      </div>
    </x-chartip>

    <svg
      v-if="viewWidth"
      width="100%"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
    >
      <!-- chart axis -->
      <g>
        <!-- x axis -->
        <line
          class="axis"
          :x1="paddingLeft"
          :y1="viewHeight - paddingBottom"
          :x2="viewWidth - paddingRight"
          :y2="viewHeight - paddingBottom"
        />

        <!-- y axis -->
        <line
          class="axis"
          :x1="paddingLeft"
          :y1="paddingTop"
          :x2="paddingLeft"
          :y2="viewHeight - paddingBottom"
        />

        <!-- x grid -->
        <g>
          <g v-for="(xAxis, index) in xAxisScale" :key="index">
            <rect
              class="bg-rect"
              :width="index === 0 ? 0: xGridFullWidth * 0.5"
              :height="viewHeight - paddingTop - paddingBottom"
              :x="getXGridBgInterval(index)"
              :y="paddingTop"
            />
            <text
              class="axisScale"
              text-anchor="middle"
              :x="getXAxisLabel(index)"
              :y="viewHeight - paddingBottom"
              dy="1.5em"
            >{{ formatStartTime(xAxis.value) }}</text>
          </g>
        </g>

        <!-- y grid -->
        <g>
          <g v-for="(yAxis, index) in yAxisScale" :key="index">
            <text
              class="axisScale"
              style="text-anchor: end;"
              :x="paddingLeft"
              :y="getYAxisLabel(index)"
              dx="-0.5em"
              dy="0.32em"
            >{{ yAxis.label }}</text>
            <line
              v-if="index !== yAxisScale.length -1"
              class="axis"
              :x1="paddingLeft"
              :y1="getYAxisLabel(index)"
              :x2="viewWidth - paddingRight"
              :y2="getYAxisLabel(index)"
            />
          </g>
        </g>

        <!-- scale unit -->
        <g>
          <!-- y axis -->
          <text
            :x="paddingLeft"
            :y="paddingTop"
            dy="-0.5em"
            class="axisUnit"
          >{{ upperCaseLabel(yAxisUnit) }}</text>
        </g>
      </g>

      <!-- histogram -->
      <g>
        <transition name="slide-noward" v-for="(dt, index) in data" :key="index">
          <rect
            v-show="filterType ? filterType === dt.type : true"
            class="histogram"
            width="2"
            :fill="getFill(dt)"
            :stroke="getFill(dt)"
            :stroke-opacity="0.7"
            :stroke-width="0"
            :height="getRectHeight(dt)"
            :x="getXPosition(dt)"
            :y="viewHeight - paddingBottom - getRectHeight(dt)"
            @mousemove="mousemove(dt, index, $event)"
            @mouseleave="mouseleave"
          />
        </transition>
      </g>
    </svg>

    <!-- chart label -->
    <div v-if="data.length" class="chart-label">
      <div
        class="chart-label-group"
        v-for="(dt, index) in types"
        :key="index"
        :ref="labelKey + dt.type"
        :style="index !== 0 ? 'margin-left: 25px;' : ''"
        @mouseover="mouseoverLabel(dt)"
        @mouseleave="mouseleaveLabel(dt)"
        @click="choseLabel(dt)"
      >
        <div class="label-icon" :style="'background-color: ' + getFill(dt)"></div>
        <div class="label-value">{{ dt.type }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import histogramModule from "../../javascripts/chart/Histogram";

export default {
  props: {
    data: Array,
    xAxisScaleCount: Number,
    yAxisScaleCount: Number,
    xAxis: String,
    yAxis: String,
    yAxisUnit: String,
    yAxisZero: Boolean
  },

  data() {
    return {
      defaultXAxisScaleCount: 5,
      defaultYAxisScaleCount: 4,
      viewWidth: 0,
      viewHeight: 400,
      paddingLeft: 40,
      paddingRight: 41,
      paddingTop: 20,
      paddingBottom: 27,
      labelKey: "label-",
      single: undefined,
      filterType: undefined,
      chartipData: {}
    };
  },

  ...histogramModule
};
</script>

<style scoped>
.histogram {
  cursor: pointer;
}

.histogram:hover {
  transition: stroke-opacity 0.1s ease-out, stroke-width 0.1s ease-out;
  stroke-opacity: 0.5;
  stroke-width: 5px;
}

.chartip-key {
  margin-top: 2px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* color: #373d41; */
}

.chartip-value {
  margin-top: 2px;
}
</style>