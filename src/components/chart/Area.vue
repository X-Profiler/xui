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

        <!-- y grid -->
        <g v-for="(yAxis, index) in yAxisScale" :key="index">
          <text
            class="axisScale"
            style="text-anchor: end;"
            :x="paddingLeft"
            :y="paddingTop + (viewHeight - paddingTop - paddingBottom ) / yAxisScaleCountInner * index"
            dx="-0.5em"
            dy="0.32em"
          >{{ yAxis }}</text>
          <line
            class="axis"
            :x1="paddingLeft"
            :y1="paddingTop + (viewHeight - paddingTop - paddingBottom ) / yAxisScaleCountInner * index"
            :x2="viewWidth - paddingRight"
            :y2="paddingTop + (viewHeight - paddingTop - paddingBottom ) / yAxisScaleCountInner * index"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
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
      viewHeight: 210,
      paddingLeft: 38,
      paddingRight: 5,
      paddingTop: 20,
      paddingBottom: 20
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

      const interval = max / count;
      const scales = [];
      for (let i = 0; i <= count; i++) {
        scales.push(Math.round(max - interval * i));
      }
      return scales;
    }
  },

  computed: {
    xAxisScaleCountInner() {
      return this.xAxisScaleCount || this.defaultXAxisScaleCount;
    },

    yAxisScaleCountInner() {
      return this.yAxisScaleCount || this.defaultYAxisScaleCount;
    },

    yAxisScale() {
      return this.getScale(this.yAxisScaleCountInner);
    }
  }
};
</script>

<style scoped>
</style>