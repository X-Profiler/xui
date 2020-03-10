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
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    yAxis: Array,
    data: Array
  },

  data() {
    return {
      defaultXAxisScaleCount: 8,
      defaultYAxisScaleCount: 4,
      viewWidth: 500,
      viewHeight: 210,
      paddingLeft: 30,
      paddingRight: 20,
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
    }
  }
};
</script>

<style scoped>
.axis {
  stroke: #eff1f4;
  stroke-width: 1;
}
</style>