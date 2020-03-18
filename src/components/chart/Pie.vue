<template>
  <div ref="pie">
    <svg
      v-if="viewWidth"
      width="100%"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
    >
      <circle
        v-for="(data, index) in list"
        :key="index"
        :r="radius"
        :cx="cx"
        :cy="cy"
        fill="none"
        :stroke="data.color"
        :stroke-width="pieStrokeWidth"
        :stroke-dasharray="`${data.occupy} ${dashbase}`"
        :stroke-dashoffset="`${-data.offset}`"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    yAxis: Array,
    data: Object
  },

  data() {
    return {
      viewWidth: 0,
      viewHeight: 0,
      paddingLeft: 0,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 0,
      pieStrokeWidth: 20,
      radius: 70,
      colors: [
        "#2b85e4",
        "#5cadff",
        "#2196f3",
        "#6a5acd",
        "#9083e0",
        "#673ab7",
        "#19be6b",
        "#1e9652"
      ]
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
    },

    getColor(axis) {
      const index = this.yAxis.indexOf(axis);
      return this.colors[index % this.colors.length];
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
    },

    list() {
      const yAxis = this.yAxis;
      const data = this.data;
      const list = [];

      let total = 0;
      for (const axis of yAxis) {
        const value = data[axis] || 0;
        total += value;
      }

      if (!total) {
        return list;
      }

      for (let i = 0; i < yAxis.length; i++) {
        const axis = yAxis[i];
        const tmp = {};
        const value = data[axis] || 0;
        tmp.value = value;
        tmp.occupy = (value / total) * this.dashbase;

        let offset = 0;
        for (let index = 0; index < i; index++) {
          offset += list[index].occupy;
        }
        tmp.offset = offset;
        tmp.color = this.getColor(axis);

        list.push(tmp);
      }

      return list;
    }
  }
};
</script>

<style scoped>
</style>