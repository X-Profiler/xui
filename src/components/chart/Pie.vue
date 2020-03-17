<template>
  <div ref="pie">
    <svg
      v-if="viewWidth"
      width="100%"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
    >
      <circle
        :r="radius"
        :cx="cx"
        :cy="cy"
        fill="none"
        stroke="#f00"
        :stroke-width="pieStrokeWidth"
        :stroke-dasharray="'50 ' + dashbase"
      />
      <circle
        :r="radius"
        :cx="cx"
        :cy="cy"
        fill="none"
        stroke="#0f0"
        :stroke-width="pieStrokeWidth"
        :stroke-dasharray="'96 ' + dashbase"
        stroke-dashoffset="-50"
      />
      <circle
        :r="radius"
        :cx="cx"
        :cy="cy"
        fill="none"
        stroke="#00f"
        :stroke-width="pieStrokeWidth"
        :stroke-dasharray="'158 ' + dashbase"
        stroke-dashoffset="-146"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewWidth: 0,
      viewHeight: 0,
      paddingLeft: 0,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 0,
      pieStrokeWidth: 20,
      radius: 70
    };
  },

  mounted() {
    this.pie = this.$refs.pie;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.pie).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
      const height = (width / 5) * 4;
      this.viewHeight = height + this.paddingTop;
    }
  },

  computed: {
    cx() {
      const position = this.radius + this.pieStrokeWidth / 2;
      return position;
    },

    cy() {
      const position = this.cx + this.paddingTop;
      return position;
    },

    dashbase() {
      return 2 * Math.PI * this.radius;
    }
  }
};
</script>

<style scoped>
</style>