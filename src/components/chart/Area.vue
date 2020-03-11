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
            style="text-anchor: middle;"
            :x="getXAxisLabel(index)"
            :y="viewHeight-paddingBottom"
            dy="1.4em"
          >
            <tspan>{{ xAxis.value }}</tspan>
            <tspan class="time-label" :x="getXAxisLabel(index)" dy="1.1em">{{ xAxis.label }}</tspan>
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    xAxis: [String, Array],
    yAxis: Array,
    data: Array,
    xAxisScaleCount: Number,
    yAxisScaleCount: Number
  },

  data() {
    return {
      defaultXAxisScaleCount: 8,
      defaultYAxisScaleCount: 4,
      viewWidth: 500,
      viewHeight: 240,
      paddingLeft: 38,
      paddingRight: 8,
      paddingTop: 20,
      paddingBottom: 33
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
        return [0];
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
      let start = data[0].time;
      let end = data[data.length - 1].time;
      // console.log(1233, start, end);

      return [
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        },
        {
          value: "01",
          label: "AM"
        }
      ];
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
    }
  }
};
</script>

<style scoped>
</style>