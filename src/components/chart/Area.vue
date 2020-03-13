<template>
  <div ref="area">
    <svg
      v-if="viewWidth"
      width="100%"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
      @mouseover="mouseover"
      @mousemove="mousemove"
      @mouseleave="mouseleave"
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
          >{{ yAxis }}</text>
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
          :y="viewHeight-paddingBottom"
          dy="1.4em"
        >
          <tspan>{{ xAxis.value }}</tspan>
          <tspan class="time-label" :x="getXAxisLabel(index)" dy="1.3em">{{ xAxis.label }}</tspan>
        </text>
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
      <g v-for="y in yAxisData" :key="y.axis">
        <defs>
          <linearGradient :id="'color_bg_' + y.axis" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-opacity:0.16" :stop-color="y.bg" />
            <stop offset="100%" style="stop-opacity: 0.1" stop-color="rgba(255, 255, 255, 1)" />
          </linearGradient>
        </defs>
        <path
          v-if="pathWidthMap[y.axis]"
          :d="y.path"
          :fill="'url(#' + 'color_bg_' + y.axis + ')'"
          stroke="none"
        />
        <polyline
          stroke-opacity="0.75"
          :points="y.points"
          :stroke="y.color"
          fill="none"
          :stroke-width="pathWidthMap[y.axis]"
        />
      </g>

      <!-- intersection -->
      <g>
        <line
          v-show="intersectionOffsetX"
          :x1="intersectionOffsetX"
          :y1="paddingTop"
          :x2="intersectionOffsetX"
          :y2="viewHeight- paddingBottom"
          fill="none"
          stroke-width="1"
          stroke="#adbcc9"
          class="intersection"
        />

        <circle
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
  </div>
</template>

<script>
import areaModule from "../../javascripts/chart/Area";

const areaData = Object.assign(
  {
    props: {
      xAxis: [String, Array],
      yAxis: Array,
      data: Array,
      xAxisScaleCount: Number,
      yAxisScaleCount: Number,
      noDataText: String
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
        colors: ["#2db7f5", "#5cadff", "#2b85e4", "#1e8449"]
      };
    }
  },
  areaModule
);

export default areaData;
</script>