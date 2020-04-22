<template>
  <div ref="area">
    <!-- chartip -->
    <x-chartip ref="chartip">
      <div slot="header" class="chartip-header">
        <div>{{ chartipTitle }}</div>
      </div>
      <div slot="content" class="chartip-content">
        <div>
          <div v-for="(y, index) in yAxis" :key="index">
            <div v-if="pathWidthMap[y]" class="chartip-content-group">
              <div class="chartip-label" :style="'background-color: ' + getColor(y)"></div>
              <div class="chartip-key">{{ y }}:</div>
            </div>
          </div>
        </div>
        <div style="margin-left: 23px;">
          <div v-for="(y, index) in yAxis" :key="index">
            <div v-if="pathWidthMap[y]" class="chartip-content-group">
              <div>{{ chartipData[y] }}{{ yAxisUnit }}</div>
            </div>
          </div>
        </div>
      </div>
    </x-chartip>

    <div class="intersection-wrapper" v-show="!noData && intersectionOffsetX">
      <div
        v-show="!solid"
        v-for="(intersection, index) in intersections"
        :key="index"
        class="intersection"
        :style="getIntersectionStyle(intersection)"
      ></div>

      <div v-show="solid" class="intersection" :style="getIntersectionStyle()"></div>
    </div>

    <!-- chart -->
    <svg
      v-if="viewWidth"
      width="100%"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
      @mousemove="mousemove"
      @mouseleave="mouseleave"
      @click="fixIntersection"
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
          <rect
            v-for="(xAxis, index) in xAxisScale"
            :key="index"
            class="bg-rect"
            :width="index === 0 ? 0: xGridFullWidth * 0.5"
            :height="viewHeight - paddingTop - paddingBottom"
            :x="getXGridBgInterval(index)"
            :y="paddingTop"
          />
        </g>

        <!-- y grid -->
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

      <!-- chart xAxis scale  -->
      <g>
        <text
          v-for="(xAxis, index) in xAxisScale"
          :key="index"
          class="axisScale"
          text-anchor="middle"
          :x="getXAxisLabel(index)"
          :y="viewHeight - paddingBottom"
          dy="1.4em"
        >
          <tspan>{{ xAxis.value }}</tspan>
          <tspan class="time-label" :x="getXAxisLabel(index)" dy="1.3em">{{ xAxis.label }}</tspan>
        </text>
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

      <!-- no data text -->
      <g v-if="noData">
        <text
          :x="paddingLeft + (viewWidth - paddingLeft - paddingRight) / 2"
          :y="paddingTop + (viewHeight- paddingTop - paddingBottom) * 0.4"
          text-anchor="middle"
          dominant-baseline="middle"
          class="no-data-text"
        >{{ noDataText }}</text>
      </g>

      <!-- area -->
      <g>
        <g v-for="(seg, index) in yAxisData" :key="index">
          <g v-for="(y, index) in seg" :key="index">
            <defs v-if="index === 0">
              <linearGradient
                :id="'color_bg_' + y.axis"
                gradientUnits="userSpaceOnUse"
                :x1="paddingLeft"
                :y1="paddingTop"
                :x2="paddingLeft"
                :y2="viewHeight - paddingBottom"
              >
                <stop offset="0%" stop-opacity="0.15" :stop-color="y.bg" />
                <stop offset="50%" stop-opacity="0.08" :stop-color="y.bg" />
                <stop offset="100%" stop-opacity="0.01" :stop-color="y.bg" />
              </linearGradient>
            </defs>
            <transition name="slide-noward">
              <path
                v-if="!solid"
                v-show="pathWidthMap[y.axis]"
                :d="y.path"
                :fill="'url(#' + 'color_bg_' + y.axis + ')'"
                stroke="none"
              />
              <path v-else v-show="pathWidthMap[y.axis]" :d="y.path" :fill="y.color" stroke="none" />
            </transition>
            <transition name="slide-noward">
              <polyline
                v-show="pathWidthMap[y.axis]"
                :stroke-opacity="y.opacity"
                :points="y.points"
                :stroke="y.color"
                fill="none"
                :stroke-width="pathWidthMap[y.axis]"
              />
            </transition>
          </g>
        </g>
      </g>

      <g v-show="!noData && intersectionOffsetX">
        <circle
          v-show="pathWidthMap[dot.axis]"
          v-for="(dot, index) in dots"
          :key="index"
          :cx="dot.xPosition"
          :cy="dot.yPosition"
          :fill="dot.color"
          stroke="#fff"
          r="4"
          stroke-width="2"
        />
      </g>
    </svg>

    <!-- chart label -->
    <div v-if="data.length" class="chart-label">
      <div
        class="chart-label-group"
        v-for="(axis, index) in yAxis"
        :key="index"
        :ref="labelKey + axis"
        :style="index !== 0 ? 'margin-left: 25px;' : ''"
        @mouseover="mouseoverLabel(axis)"
        @mouseleave="mouseleaveLabel(axis)"
        @click="choseLabel(axis)"
      >
        <div class="label-icon" :style="'background-color: ' + getColor(axis)"></div>
        <div class="label-value">{{axis}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import areaModule from "@/javascripts/chart/Area";

export default {
  props: {
    xAxis: [String, Array],
    yAxis: Array,
    yAxisUnit: String,
    data: Array,
    xAxisScaleCount: Number,
    yAxisScaleCount: Number,
    noDataText: String,
    showStatus: Boolean,
    solid: Boolean
  },

  data() {
    return {
      defaultXAxisScaleCount: 8,
      defaultYAxisScaleCount: 4,
      viewWidth: 0,
      viewHeight: 250,
      paddingLeft: 40,
      paddingRight: 35,
      paddingTop: 20,
      paddingBottom: 40,
      intersectionOffsetX: 0,
      pathWidthMap: {},
      xPointMap: {},
      xValueMap: {},
      xPoint: [],
      dots: [],
      chartipData: {},
      single: undefined,
      labelKey: "label-",
      defaultAreaColor: [
        "#2b85e4",
        "#5cadff",
        "#2196f3",
        "#6a5acd",
        "#9083e0",
        "#673ab7",
        "#19be6b",
        "#1e9652"
      ],
      defaultColors: ["#2db7f5", "#5cadff", "#2b85e4", "#1e8449"],
      intersectionFixed: false
    };
  },

  ...areaModule
};
</script>

<style scoped>
.chartip-content-group {
  display: flex;
  align-items: center;
}

.chartip-label {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.chartip-key {
  margin-left: 5px;
}
</style>