<template>
  <div ref="mini-scatter">
    <svg
      v-if="viewWidth"
      width="100%"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
    >
      <!-- axis -->
      <g>
        <!-- x -->
        <line
          class="axis mini-scatter-axis"
          :x1="paddingLeft"
          :y1="viewHeight - paddingBottom"
          :x2="viewWidth - paddingRight"
          :y2="viewHeight - paddingBottom"
        />

        <!-- y -->
        <line
          class="axis mini-scatter-axis"
          :x1="paddingLeft"
          :y1="paddingTop"
          :x2="paddingLeft"
          :y2="viewHeight - paddingBottom"
        />
      </g>

      <!-- chart xAxis scale  -->
      <g v-for="(xAxis, index) in xAxisScale" :key="`${index}_${xAxis.label}`">
        <text
          class="axisScale"
          text-anchor="middle"
          :x="getXAxisLabel(index)"
          :y="viewHeight - paddingBottom"
          dy="1.4em"
        >{{ xAxis.label }}</text>
        <line
          class="axis mini-scatter-axis"
          :x1="getXAxisLabel(index)"
          :y1="paddingTop"
          :x2="getXAxisLabel(index)"
          :y2="viewHeight - paddingBottom"
        />
      </g>

      <!-- scatter dot -->
      <g v-for="(info, index) in data" :key="index">
        <circle :cx="getCx(info)" :cy="paddingTop - 14" :r="4.3" :opacity="0.3" :fill="dotColor" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    xAxisScaleCount: Number,
    data: Array,
    dotColor: String
  },

  data() {
    return {
      defaultXAxisScaleCount: 4,
      viewWidth: 0,
      viewHeight: 45,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 20,
      paddingBottom: 20
    };
  },

  mounted() {
    this.scatter = this.$refs["mini-scatter"];

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

    getScale(count) {
      let min = this.data[0];
      let max = this.data[0];
      for (const dt of this.data) {
        if (dt > max) {
          max = dt;
        }
        if (dt < min) {
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

      if (max <= 0 || min >= 0) {
        return scales;
      }

      let abs = undefined;
      let index = undefined;
      for (let idx = 0; idx < scales.length; idx++) {
        const item = scales[idx].value;
        const tmp = Math.abs(item);
        if (abs === undefined || tmp < abs) {
          abs = item;
          index = idx;
        }
      }

      let results = [];
      if (index !== undefined && abs !== 0) {
        if (index === 0) {
          index++;
        }
        if (index === scales.length - 1) {
          index--;
        }
        const tmp1 = Math.ceil(max / index);
        const tmp2 = Math.ceil(min / (index - (scales.length - 1)));
        const newInterval = Math.max(tmp1, tmp2);
        results[index] = { label: 0, value: 0 };
        for (let idx = index - 1; idx >= 0; idx--) {
          const scale = 0 + newInterval * (index - idx);
          results[idx] = { label: scale, value: scale };
        }
        for (let idx = index + 1; idx < scales.length; idx++) {
          const scale = 0 - newInterval * (idx - index);
          results[idx] = { label: scale, value: scale };
        }
      } else {
        results = scales;
      }

      return results;
    },

    getXAxisLabel(index) {
      return (
        this.paddingLeft +
        ((this.viewWidth - this.paddingLeft - this.paddingRight) /
          this.xAxisScaleCountInner) *
          index
      );
    },

    getCx(data) {
      const xMaxData = this.xAxisScale[this.xAxisScale.length - 1].value;
      const xMinData = this.xAxisScale[0].value;
      const offset = xMaxData
        ? ((data - xMinData) / (xMaxData - xMinData)) *
          (this.viewWidth - this.paddingLeft - this.paddingRight)
        : 0;
      const xPosition = this.paddingLeft + offset;

      return xPosition;
    }
  },

  computed: {
    xAxisScaleCountInner() {
      return this.xAxisScaleCount || this.defaultXAxisScaleCount;
    },

    xAxisScale() {
      const scales = this.getScale(this.xAxisScaleCountInner);
      scales.reverse();
      return scales;
    }
  }
};
</script>

<style scoped>
.mini-scatter-axis {
  stroke: #7f90a0;
}
</style>