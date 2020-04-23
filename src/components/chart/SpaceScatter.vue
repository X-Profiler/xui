<template>
  <div ref="space-scatter">
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
            >{{ formatXLabel(xAxis.value) }}</text>
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
    </svg>
  </div>
</template>>

<script>
export default {
  props: {
    data: Array,
    xAxisScaleCount: Number,
    yAxisScaleCount: Number,
    xAxis: String,
    yAxis: Array,
    yAxisUnit: String,
    yAxisZero: Boolean
  },

  data() {
    return {
      defaultXAxisScaleCount: 5,
      defaultYAxisScaleCount: 4,
      viewWidth: 0,
      viewHeight: 330,
      paddingLeft: 40,
      paddingRight: 41,
      paddingTop: 20,
      paddingBottom: 27,
      filterType: undefined
    };
  },

  mounted() {
    this.scatter = this.$refs["space-scatter"];

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.scatter).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
    },

    formatXLabel(value) {
      return Math.round(value);
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

    getYAxisLabel(index) {
      return (
        this.paddingTop +
        ((this.viewHeight - this.paddingTop - this.paddingBottom) /
          this.yAxisScaleCountInner) *
          (this.yAxisScaleCountInner - index)
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

    getScale(count, axis, filterType) {
      let data = this.data;
      if (!Array.isArray(data)) {
        return [];
      }
      if (filterType) {
        data = data.filter(dt => this.needShow(dt, filterType));
      }
      const needZero = axis === this.yAxis && this.yAxisZero;
      if (Array.isArray(axis)) {
        let tmp = [];
        for (const axi of axis) {
          tmp = tmp.concat(data.map(dt => dt[axi]));
        }
        data = tmp;
      } else {
        data = data.map(dt => dt[axis]);
      }
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

    handleBroadcase() {},

    showTip() {},

    hiddenTip() {}
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
      const scales = this.getScale(
        this.yAxisScaleCountInner,
        this.yAxis,
        this.filterType
      );
      scales.reverse();
      return scales;
    }
  }
};
</script>