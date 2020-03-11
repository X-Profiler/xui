<template>
  <div ref="area">
    <svg width="100%" :height="viewHeight" :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`">
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
        <g v-for="y in yAxisData" :key="y.key">
          <defs>
            <linearGradient :id="'color_bg_' + y.key" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-opacity:0.16" :stop-color="y.bg" />
              <stop offset="100%" style="stop-opacity: 0.1" stop-color="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
          <path :d="y.path" :fill="'url(#' + 'color_bg_' + y.key + ')'" stroke="none" />
          <polyline
            stroke-opacity="0.75"
            :points="y.points"
            :stroke="y.color"
            fill="none"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as moment from "moment";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
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
      viewWidth: 500,
      viewHeight: 250,
      paddingLeft: 40,
      paddingRight: 35,
      paddingTop: 20,
      paddingBottom: 40,
      colors: ["#2db7f5", "#5cadff", "#2b85e4", "#1e8449"]
    };
  },

  mounted() {
    this.area = this.$refs.area;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.area).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
      // this.viewHeight = (width / 5) * 4;
    },

    getScale(count) {
      const fileds = this.yAxis;
      const data = this.data;
      let max = 0;
      for (const dt of data) {
        for (const field of fileds) {
          if (dt[field] && !isNaN(dt[field]) && dt[field] > max) {
            max = dt[field];
          }
        }
      }

      if (max === 0) {
        return [];
      }

      const interval = max / count;
      const scales = [];
      for (let i = 0; i <= count; i++) {
        scales.push(Math.round(max - interval * i));
      }
      return scales;
    },

    getTimeScale(count) {
      const data = this.data;
      if (!Array.isArray(data) || !data.length) {
        return [];
      }
      const start = data[0].time;
      const end = data[data.length - 1].time;
      const interval = (end - start) / count;
      const today = moment().day();
      const scales = [];
      let crossDayFlag = false;
      for (let i = 0; i <= count; i++) {
        const time = moment(end).subtract(i * interval, "ms");
        const hour = time.hours();
        if (time.day() !== today && !crossDayFlag) {
          crossDayFlag = true;
          scales.push({ label: time.format("MM.DD"), value: week[time.day()] });
        } else {
          scales.push({ label: hour < 12 ? "AM" : "PM", value: hour });
        }
      }

      return scales;
    },

    getXGridBgInterval(index) {
      return (
        this.paddingLeft -
        this.xGridFullWidth * 0.75 +
        this.xGridFullWidth * index
      );
    },

    getXAxisLabel(index) {
      return (
        this.paddingLeft +
        ((this.viewWidth - this.paddingLeft - this.paddingRight) /
          this.xAxisScaleCountInner) *
          index
      );
    },

    getYAxisLabel(index) {
      return (
        this.paddingTop +
        ((this.viewHeight - this.paddingTop - this.paddingBottom) /
          this.yAxisScaleCountInner) *
          (this.yAxisScaleCountInner - index)
      );
    },

    getPoints(axis) {
      const data = this.data;
      const xMaxData = data[data.length - 1] && data[data.length - 1].time;
      const xMinData = data[0] && data[0].time;
      const yMaxData = this.yAxisScale[this.yAxisScale.length - 1];
      if (!xMaxData || !xMinData || !yMaxData) {
        return [];
      }

      const points = [];
      for (const dt of this.data) {
        const time = dt.time;
        const value = dt[axis];

        // x position
        const xOffset =
          ((time - xMinData) / (xMaxData - xMinData)) *
          (this.viewWidth - this.paddingLeft - this.paddingRight);
        const xPosition = this.paddingLeft + xOffset;

        // y position
        const yOffset =
          (value / yMaxData) *
          (this.viewHeight - this.paddingTop - this.paddingBottom);
        const yPosition = this.viewHeight - this.paddingBottom - yOffset;

        points.push(`${xPosition},${yPosition}`);
      }

      return points;
    },

    getColor(axis) {
      const index = this.yAxis.indexOf(axis);
      return this.colors[index % this.colors.length];
    }
  },

  computed: {
    xAxisScaleCountInner() {
      return this.xAxisScaleCount || this.defaultXAxisScaleCount;
    },

    yAxisScaleCountInner() {
      return this.yAxisScaleCount || this.defaultYAxisScaleCount;
    },

    xAxisScale() {
      let scales = [];

      if (this.xAxis === "time") {
        scales = this.getTimeScale(this.xAxisScaleCountInner);
        scales.reverse();
      }

      return scales;
    },

    yAxisScale() {
      const scales = this.getScale(this.yAxisScaleCountInner);
      scales.reverse();
      return scales;
    },

    xGridFullWidth() {
      return (
        (this.viewWidth - this.paddingLeft - this.paddingRight) /
        this.xAxisScaleCountInner
      );
    },

    noData() {
      return !this.xAxisScale.length && !this.yAxisScale.length;
    },

    yAxisData() {
      if (this.noData) {
        return [];
      }

      return this.yAxis.map(y => {
        const data = {
          key: y
        };

        // points
        let points = this.getPoints(y);
        data.points = points.join(" ");

        // path
        const first = points.shift();
        const last = points.pop();
        let path = "";
        if (first && last) {
          points = points.map(p => `L${p}`);
          path += `M${first} ` + points.join(" ") + ` L${last}`;
          const buttom = this.viewHeight - this.paddingBottom;
          path += ` L${last.split(",")[0]},${buttom}`;
          path += ` L${first.split(",")[0]},${buttom} Z`;
        }
        data.path = path;

        // color
        const color = this.getColor(y);
        data.color = color;

        // data.bg = "rgba(36,185,13,0.4)";
        data.bg = color;

        return data;
      });
    }
  }
};
</script>