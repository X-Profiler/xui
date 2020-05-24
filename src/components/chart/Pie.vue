<template>
  <div ref="pie">
    <!-- chartip -->
    <x-chartip ref="chartip">
      <div slot="content" class="chartip-content">
        <div class="chartip-content-group">
          <div class="chartip-label" :style="'background-color: ' + selectedData.color"></div>
          <div class="chartip-key">{{ selectedData.axis }}:</div>
        </div>
        <div style="margin-left: 10px;">
          <div>{{ formatValue(selectedData.value) }}{{ yAxisUnit }}</div>
        </div>
      </div>
    </x-chartip>

    <!-- pie chart -->
    <div class="pie">
      <svg
        v-if="viewWidth"
        :width="viewWidth"
        :height="viewHeight"
        :viewBox="`0, 0, ${viewWidth}, ${viewHeight}`"
      >
        <circle
          v-for="(data, index) in list"
          :key="index"
          :ref="data.axis"
          :r="radius"
          :cx="cx"
          :cy="cy"
          fill="none"
          :stroke="data.color"
          :stroke-width="pieStrokeWidth"
          :stroke-dasharray="`${data.occupy} ${dashbase}`"
          :stroke-dashoffset="`${-data.offset}`"
          @mousemove="mousemove(data, $event)"
          @mouseleave="mouseleave"
          class="circle"
        />
      </svg>

      <div class="label" :style="'padding-top: ' + paddingTop + 'px;'">
        <div
          v-for="(axis, index) in yAxis"
          :key="index"
          class="label-group"
          @mousemove="mousemoveLabel(index)"
          @mouseleave="mouseleaveLabel(index)"
        >
          <div class="label-icon" :style="'background-color: ' + getColor(axis)"></div>
          <div class="label-value">{{ axis }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createLaterFunction, isNumber } from "@/javascripts/lib/utils";

export default {
  props: {
    yAxis: Array,
    yAxisUnit: String,
    data: Object
  },

  data() {
    return {
      viewWidth: 0,
      viewHeight: 0,
      paddingLeft: 0,
      paddingRight: 30,
      paddingTop: 20,
      paddingBottom: 0,
      pieStrokeWidth: 23,
      radius: 60,
      pieWidth: 0,
      selectedData: {},
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
    this.chartip = this.$refs.chartip;

    this.setViewBox();
    this.setPieWidth();
    window.addEventListener("resize", this.setPieWidth.bind(this));
  },

  methods: {
    setPieWidth() {
      const width = parseInt(window.getComputedStyle(this.pie).width, 10);
      if (!width) {
        return;
      }
      this.pieWidth = width;
    },

    formatValue(value) {
      if (isNumber(value)) {
        return value.toFixed(2);
      }
      return value;
    },

    setViewBox() {
      this.viewWidth = 2 * this.cx;
      this.viewHeight = this.viewWidth + this.paddingTop;
    },

    getColor(axis) {
      const index = this.yAxis.indexOf(axis);
      return this.colors[index % this.colors.length];
    },

    ...createLaterFunction("mousemove", function(data, event) {
      this.selectedData = data;
      const minLegalY = this.paddingTop;
      const maxLegalX = this.pieWidth;
      this.chartip.show(event, minLegalY, maxLegalX);
    }),

    ...createLaterFunction("mouseleave", function() {
      this.chartip.hidden();
    }),

    ...createLaterFunction("mousemoveLabel", function(index) {
      const data = this.list[index];
      const style = this.$refs[data.axis][0].style;
      style["opacity"] = 0.85;
    }),

    ...createLaterFunction("mouseleaveLabel", function(index) {
      const data = this.list[index];
      const style = this.$refs[data.axis][0].style;
      style["opacity"] = 1;
    })
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
      if (!this.data) {
        return [];
      }

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
        const tmp = { axis };
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

      for (const item of list) {
        item.occupy -= 1;
        if (item.occupy < 0) {
          item.occupy = 0;
        }
      }

      return list;
    }
  }
};
</script>

<style scoped>
.pie {
  display: flex;
  flex-wrap: wrap;
}

.circle {
  cursor: pointer;
  transition: all 0.1s ease;
}

.circle:hover {
  opacity: 0.85;
  stroke-width: 22px;
}

.label {
  margin-left: 30px;
}

.label-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 3px 0;
  cursor: pointer;
}

.label-group:hover .label-icon {
  transform: scale(1.2);
  transition: all 0.1s ease;
}

.chartip-content {
  display: flex;
  padding: 5px;
}

.chartip-key {
  margin-left: 5px;
}
</style>