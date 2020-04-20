<template>
  <div ref="histogram">
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
        <rect
          v-for="(dt, index) in data"
          :key="index"
          width="2"
          :fill="getFill(dt)"
          :height="getRectHeight(dt)"
          :x="getXPosition(dt)"
          :y="viewHeight - paddingBottom - getRectHeight(dt)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { formatTime } from "@/javascripts/lib/utils";

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
      paddingBottom: 40
    };
  },

  mounted() {
    this.histogram = this.$refs.histogram;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.histogram).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
      // this.viewHeight = (width / 5) * 3;
    },

    formatStartTime(value) {
      return formatTime(value, false, true, 0);
    },

    upperCaseLabel(label) {
      return label.toUpperCase();
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

    getScale(count, axis) {
      if (!Array.isArray(this.data)) {
        return [];
      }
      const needZero = axis === this.yAxis && this.yAxisZero;
      const data = this.data.map(dt => dt[axis]);
      let min = needZero ? 0 : data[0];
      let max = data[0];
      for (const dt of data) {
        if (dt > max) {
          max = dt;
        }
        if (dt < min && !needZero) {
          min = dt;
        }
      }
      const interval = (max - min) / count;
      const scales = [];
      for (let i = 0; i <= count; i++) {
        const scale = max - interval * i;

        scales.push({
          label: interval <= 0.5 ? Number(scale.toFixed(2)) : Math.round(scale),
          value: scale
        });
      }
      return scales;
    },

    getRectHeight({ pause }) {
      const yMaxData = this.yAxisScale[this.yAxisScale.length - 1].value;
      const yMinData = this.yAxisScale[0].value;
      const height =
        yMaxData - yMinData
          ? ((pause - yMinData) / (yMaxData - yMinData)) *
            (this.viewHeight - this.paddingTop - this.paddingBottom)
          : 0;
      return height;
    },

    getXPosition({ timeFromStart }) {
      const xMaxData = this.xAxisScale[this.xAxisScale.length - 1].value;
      const xMinData = this.xAxisScale[0].value;
      const offset =
        xMaxData - xMinData
          ? ((timeFromStart - xMinData) / (xMaxData - xMinData)) *
            (this.viewWidth - this.paddingLeft - this.paddingRight)
          : 0;
      const xPosition = this.paddingLeft + offset;

      return xPosition;
    },

    getFill({ type }) {
      let color = "";
      switch (type) {
        case "scavenge":
          color = "#3498db";
          break;
        case "marksweep":
          color = "#ff9900";
          break;
        case "marking":
          color = "#6a5acd";
          break;
        default:
          break;
      }
      return color;
    }
  },

  computed: {
    xAxisScaleCountInner() {
      return this.xAxisScaleCount || this.defaultXAxisScaleCount;
    },

    yAxisScaleCountInner() {
      return this.yAxisScaleCount || this.defaultYAxisScaleCount;
    },

    xGridFullWidth() {
      return (
        (this.viewWidth - this.paddingLeft - this.paddingRight) /
        this.xAxisScaleCountInner
      );
    },

    xAxisScale() {
      const scales = this.getScale(this.xAxisScaleCountInner, this.xAxis);
      scales.reverse();
      return scales;
    },

    yAxisScale() {
      const scales = this.getScale(this.yAxisScaleCountInner, this.yAxis);
      scales.reverse();
      return scales;
    }
  }
};
</script>