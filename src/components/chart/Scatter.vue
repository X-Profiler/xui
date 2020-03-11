<template>
  <div ref="content">
    <transition name="slide-rightward">
      <svg
        v-show="display"
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

        <!-- chart xAxis scale  -->
        <g>
          <text
            v-for="(xAxis, index) in xAxisScale"
            :key="index"
            class="axisScale"
            style="text-anchor: middle;"
            :x="paddingLeft + (viewWidth -paddingLeft- paddingRight) / xAxisScaleCountInner * index"
            :y="viewHeight-paddingBottom"
            dy="1.4em"
          >{{ xAxis }}</text>
        </g>

        <!-- scale unit -->
        <g>
          <!-- x axis -->
          <text
            :x="viewWidth - paddingRight"
            :y="viewHeight-paddingBottom"
            :dx="xAxisUnit[1]"
            dy="-0.7em"
            class="axisUnit"
          >{{ fields[0] }}/{{ xAxisUnit[0] }}</text>

          <!-- y axis -->
          <text
            :x="paddingLeft"
            :y="paddingTop"
            :dx="yAxisUnit[1]"
            dy="-0.7em"
            class="axisUnit"
          >{{ fields[1] }}/{{ yAxisUnit[0] }}</text>
        </g>

        <!-- scatter dot -->
        <g v-for="(info, index) in data" :key="index">
          <circle
            :cx="getCx(info)"
            :cy="getCy(info)"
            :class="'circle ' + (info.selected ? 'selected': '')"
            :r="info.selected ? 6 * 1 : 6"
            :stroke="info.color"
            :fill="info.color"
            @click="select(index)"
            @mouseover="mouseover(info, $event)"
            @mousemove="mousemove(info, $event)"
            @mouseout="mouseout()"
          />
        </g>
      </svg>
    </transition>

    <!-- tooltip -->
    <x-tooltip ref="tooltip">
      <template slot="header">
        <slot name="header" :proc="selectedProc"></slot>
      </template>
      <template slot="content">
        <slot
          name="content"
          :proc="selectedProc"
          :fields="[fields[1], fields[0]]"
          :unit="[yAxisUnit[0], xAxisUnit[0]]"
        ></slot>
      </template>
    </x-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    fields: Array,
    data: Array,
    xAxisUnit: Array,
    yAxisUnit: Array,
    xAxisScaleCount: Number,
    yAxisScaleCount: Number,
    display: Boolean
  },

  data() {
    return {
      defaultXAxisScaleCount: 6,
      defaultYAxisScaleCount: 5,
      viewWidth: 500,
      viewHeight: 400,
      paddingLeft: 30,
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20,
      selectedProc: {}
    };
  },

  mounted() {
    this.tooltip = this.$refs.tooltip;
    this.content = this.$refs.content;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.content).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
      this.viewHeight = (width / 5) * 4;
    },

    getScale(index, count) {
      if (!Array.isArray(this.data) || !Array.isArray(this.fields)) {
        return;
      }
      const data = this.data.map(d => d[this.fields[index]]);
      data.sort((o, n) => (o < n ? 1 : -1));
      const max = Math.ceil(data[0]);
      const interval = max / count;
      const scales = [];
      for (let i = 0; i <= count; i++) {
        scales.push(Math.round(max - interval * i));
      }
      return scales;
    },

    getCx(data) {
      const xData = data[this.fields[0]];
      const xMaxData = this.xAxisScale[this.xAxisScale.length - 1];
      const offset = xMaxData
        ? (xData / xMaxData) *
          (this.viewWidth - this.paddingLeft - this.paddingRight)
        : 0;
      const xPosition = this.paddingLeft + offset;

      return xPosition;
    },

    getCy(data) {
      const yData = data[this.fields[1]];
      const yMaxData = this.yAxisScale[0];
      const offset = yMaxData
        ? (yData / yMaxData) *
          (this.viewHeight - this.paddingTop - this.paddingBottom)
        : 0;
      const yPosition = this.viewHeight - this.paddingBottom - offset;
      return yPosition;
    },

    getXGridBgInterval(index) {
      return (
        this.paddingLeft -
        this.xGridFullWidth * 0.75 +
        this.xGridFullWidth * index
      );
    },

    select(index) {
      this.$emit("select", index);
    },

    mouseover(proc, event) {
      this.selectedProc = proc;
      this.tooltip.showToolTip(this.viewWidth * 2, event);
    },

    mousemove(proc, event) {
      this.selectedProc = proc;
      this.tooltip.showToolTip(this.viewWidth * 2, event);
    },

    mouseout() {
      this.tooltip.removeToolTip();
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
      const scales = this.getScale(0, this.xAxisScaleCountInner);
      scales.reverse();
      return scales;
    },

    yAxisScale() {
      return this.getScale(1, this.yAxisScaleCountInner);
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
.axisUnit {
  font-size: 12px;
  fill: #808695;
}

.circle {
  cursor: pointer;
}

.circle:hover,
.selected {
  transition: all 0.1s ease-out;
  stroke-opacity: 0.4;
  stroke-width: 8px;
}
</style>

<!-- <g>
        <defs>
          <linearGradient id="orange_red" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(36,185,13,0.4); stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(255,255,255,0.6); stop-opacity:1" />
          </linearGradient>
        </defs>
        <path
          d="M50,110 L100,210 L170,60 L240,40 L310,50 L380,140 L380,350 L50,350 Z"
          style="fill:url(#orange_red);stroke:none;"
        />
        <polyline
          points="50,110 100,210 170,60 240,40 310,50 380,140"
          style="fill:none;stroke:#3fc371;stroke-width:1"
        />
      </g> -->