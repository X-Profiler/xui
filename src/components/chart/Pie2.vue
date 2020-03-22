<template>
  <div class="pie" ref="pie">
    <div class="desc" ref="desc" :style="descStyle">
      <slot name="title">
        <div class="desc-title">{{ title }}</div>
      </slot>
      <div class="desc-percentage">{{ percentage }}%</div>
    </div>
    <svg
      v-if="viewWidth"
      :width="viewWidth"
      :height="viewHeight"
      :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
    >
      <!-- background -->
      <circle
        :transform="`translate(${cx},${cy})rotate(${bgRotate})`"
        :r="radius"
        fill="none"
        stroke="#ebedf1"
        :stroke-width="pieStrokeWidth"
        :stroke-dasharray="`${bgOccupy} ${dashbase}`"
      />

      <!-- needle -->
      <g :transform="`translate(${cx},${cy})rotate(${needleRotate})`">
        <circle r="4" fill="none" :stroke="needleColor" stroke-width="3" />
        <path
          class="needle-body"
          :d="`M3.5,4 H-3.5 L-0.5,${cx - pieStrokeWidth - 5} L0.5,${cx - pieStrokeWidth - 5} Z`"
          :fill="needleColor"
        />
      </g>

      <!-- content -->
      <circle
        :transform="`translate(${cx},${cy})rotate(${bgRotate})`"
        :r="radius"
        fill="none"
        :stroke="contentColor"
        :stroke-width="pieStrokeWidth"
        :stroke-dasharray="`${contentOccupy} ${dashbase}`"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    percentage: Number
  },

  mounted() {
    this.pie = this.$refs.pie;
    this.desc = this.$refs.desc;

    this.setViewBox();
    this.setPieWidth();

    window.addEventListener("resize", this.setPieWidth.bind(this));
  },

  data() {
    return {
      pie: undefined,
      viewWidth: 0,
      viewHeight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 17,
      paddingBottom: 0,
      pieStrokeWidth: 11,
      radius: 91,
      bgPercentage: 29 / 40,
      pieWidth: 0,
      descWidth: 0,
      needleColor: "#2376b7"
    };
  },

  methods: {
    setViewBox() {
      this.viewWidth = 2 * this.cx;
      this.viewHeight = this.viewWidth + this.paddingTop;
    },

    setPieWidth() {
      const pieWidth = parseInt(window.getComputedStyle(this.pie).width, 10);
      const descWidth = parseInt(window.getComputedStyle(this.desc).width, 10);
      if (pieWidth) {
        this.pieWidth = pieWidth;
      }
      if (descWidth) {
        this.descWidth = descWidth;
      }
    },

    getColor(percentage) {
      let color = "";
      if (percentage <= 60) {
        color = "#2a9446";
      } else if (percentage <= 85) {
        color = "#db7c00";
      } else {
        color = "#e33900";
      }

      return color;
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

    bgOccupy() {
      return 2 * Math.PI * this.radius * this.bgPercentage;
    },

    bgRotate() {
      const rotate = (360 * (this.dashbase - this.bgOccupy)) / this.dashbase;
      return 90 + rotate / 2;
    },

    contentOccupy() {
      return (this.bgOccupy * this.percentage) / 100;
    },

    contentColor() {
      return this.getColor(this.percentage);
    },

    descStyle() {
      const pieWidth = this.pieWidth;
      const descWidth = this.descWidth;
      let style = "";

      if (pieWidth && descWidth) {
        style += "left: " + (pieWidth - descWidth) / 2 + "px;";
        style += "top: " + (this.cy + 30) + "px;";
      }

      return style;
    },

    needleRotate() {
      const percentage = this.percentage;
      const cantRotate =
        (360 * (this.dashbase - this.bgOccupy)) / this.dashbase;
      const canRotate = 360 - cantRotate;
      let rotate = cantRotate / 2;
      if (!percentage || isNaN(percentage)) {
        return rotate;
      }
      rotate += (percentage / 100) * canRotate;

      return rotate;
    }
  }
};
</script>

<style scoped>
.pie {
  position: relative;
}

.desc {
  position: absolute;
}

.desc-title {
  color: #919597;
}

.desc-percentage {
  font-size: 18px;
  font-weight: bold;
}
</style>