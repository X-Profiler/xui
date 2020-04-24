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
          <g v-for="(axis, index) in yAxis" :key="index">
            <text
              class="axisScale"
              style="text-anchor: end;"
              :x="paddingLeft"
              :y="getYAxisLabel(index)"
              dx="-0.5em"
              dy="0.32em"
            >{{ axis.label }}</text>
            <line
              v-if="index !== yAxis.length -1"
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

      <!-- scatter -->
      <g v-for="(info, index) in data" :key="index">
        <g v-for="(axis, index) in yAxis" :key="index">
          <circle
            class="circle"
            :cx="getCx(info)"
            :cy="getYAxisLabel(index)"
            :r="getRadius(info, axis)"
            :opacity="0.4"
            :fill="getColor(info, axis)"
            :stroke="getColor(info, axis)"
          />
        </g>
      </g>
    </svg>

    <!-- chart label -->
    <div v-if="data.length" class="chart-label">
      <div
        class="chart-label-group"
        v-for="(dt, index) in types"
        :key="index"
        :ref="labelKey + dt.type"
        :style="index !== 0 ? 'margin-left: 25px;' : ''"
        @mouseenter="mouseoverLabel(dt)"
        @mouseleave="mouseleaveLabel(dt)"
        @click="choseLabel(dt)"
      >
        <div class="label-icon" :style="'background-color: ' + getColor(dt)"></div>
        <div class="label-value">{{ dt.label }}</div>
      </div>
    </div>
  </div>
</template>>

<script>
import { createLaterFunction } from "../../javascripts/lib/utils";

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
      paddingLeft: 116,
      paddingRight: 41,
      paddingTop: 20,
      paddingBottom: 27,
      labelKey: "label-",
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
          (this.yAxisScaleCountInner - index - 0.5)
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

    getCx({ index }) {
      const xMaxData = this.xAxisScale[this.xAxisScale.length - 1].value;
      const xMinData = this.xAxisScale[0].value;
      const offset = xMaxData
        ? ((index - xMinData) / (xMaxData - xMinData)) *
          (this.viewWidth - this.paddingLeft - this.paddingRight)
        : 0;
      const xPosition = this.paddingLeft + offset;

      return xPosition;
    },

    needShow(info, value) {
      if (!this.filterType) {
        return true;
      }
      const positive = info[`${value}_positive`];
      if (this.filterType === "increment" && positive) {
        return true;
      }
      if (this.filterType === "reduce" && !positive) {
        return true;
      }
      return false;
    },

    getRadius(info, { value }) {
      const size = info[value];
      if (!size || !this.needShow(info, value)) {
        return 0;
      }
      const maxSize = 16;
      const minSize = 4;
      const spaceInfo = this.spacesInfo[value];
      let radius = (size / spaceInfo) * maxSize;
      radius = radius > maxSize ? maxSize : radius;
      radius = radius < minSize ? minSize : radius;

      return radius;
    },

    getColor(info, { value } = {}) {
      const positive = info[`${value}_positive`];
      if (positive || info.type === "increment") {
        return "#c45a65";
      } else {
        return "#adbcc9";
      }
    },

    singleton({ type }) {
      this.filterType = type;

      const style = this.$refs[this.labelKey + type][0].style;
      style["transform"] = "scale(1.2)";
    },

    restore({ type }) {
      this.filterType = undefined;

      const style = this.$refs[this.labelKey + type][0].style;
      style["transform"] = "scale(1)";
    },

    ...createLaterFunction("mouseoverLabel", function(dt) {
      if (!this.single) {
        this.singleton(dt);
      }
    }),

    ...createLaterFunction("mouseleaveLabel", function(dt) {
      if (!this.single) {
        this.restore(dt);
      }
    }),

    choseLabel({ type }) {
      for (const dt of this.types) {
        this.restore(dt);
      }
      if (type !== this.single) {
        this.single = undefined;
      }
      if (!this.single) {
        this.singleton({ type });
        this.single = type;
      } else {
        this.restore({ type });
        this.single = undefined;
      }
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
      return this.yAxis.length;
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

    spacesInfo() {
      const map = {};
      for (const dt of this.data) {
        for (const { value } of this.yAxis) {
          if (map[value] !== undefined) {
            if (map[value] < dt[value]) {
              map[value] = dt[value];
            }
          } else {
            map[value] = dt[value];
          }
        }
      }
      return map;
    },

    types() {
      return [
        { type: "reduce", label: "GC 后空间大小减少" },
        { type: "increment", label: "GC 后空间大小增加" }
      ];
    }
  }
};
</script>

<style scoped>
.circle {
  cursor: pointer;
  transition: stroke-opacity 0.1s ease-out, stroke-width 0.1s ease-out;
}

.circle:hover {
  opacity: 1;
  stroke-opacity: 0.4;
  stroke-width: 10px;
}
</style>