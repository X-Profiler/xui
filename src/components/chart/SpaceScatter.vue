<template>
  <div ref="space-scatter">
    <!-- chartip -->
    <x-chartip ref="chartip" no-arrow>
      <div
        slot="header"
        class="chartip-header"
        :style="`background-color: ${chartipData.color};color: white`"
      >
        <div>{{ chartipTitle }}</div>
      </div>
      <div slot="content" class="chartip-content">
        <div style="margin-top:2px;">
          <div v-if="chartipData.showAll">
            <div
              v-for="(space, index) in chartipData.spaces"
              :key="index"
              class="chartip-content-group"
            >
              <div
                class="chartip-label"
                :style="'margin-top: 2px;background-color: ' + chartipData.colors[index]"
              ></div>
              <div class="chartip-key">{{ space }}:</div>
            </div>
          </div>
          <div v-else>
            <div class="chartip-key">堆内存空间名称:</div>
            <div class="chartip-key">堆内存大小变化:</div>
          </div>
        </div>
        <div style="margin: 2px 0 0 23px;">
          <div v-if="chartipData.showAll">
            <div
              class="chartip-value"
              v-for="(size, index) in chartipData.sizes"
              :key="index"
            >{{ size }}MB</div>
          </div>
          <div v-else>
            <div class="chartip-value">@{{ chartipData.axis }}</div>
            <div class="chartip-value">{{ chartipData.positive }}{{ chartipData.change }}MB</div>
          </div>
        </div>
      </div>
    </x-chartip>

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
      <g v-for="(info, index1) in data" :key="index1">
        <g v-for="(axis, index2) in yAxis" :key="index2">
          <circle
            class="circle"
            :ref="`${circleLabel}-${info.index}-${axis.value}`"
            :cx="getCx(info)"
            :cy="getYAxisLabel(index2)"
            :r="getRadius(info, axis)"
            :opacity="circleOpacity"
            :fill="getColor(info, axis)"
            :stroke="getColor(info, axis)"
            @mousemove.stop="mousemove(info, axis,index1, $event)"
            @mouseleave="mouseleave"
            @click="fixIntersection(info, axis, index1, $event)"
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
import spaceScatterModule from "@/javascripts/chart/SpaceScatter";

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
      viewHeight: 250,
      paddingLeft: 116,
      paddingRight: 30,
      paddingTop: 20,
      paddingBottom: 27,
      labelKey: "label-",
      filterType: undefined,
      chartipData: {},
      xValueMap: {},
      circleLabel: "scatter-label",
      intersectionFixed: false,
      validDataMap: {},
      circleOpacity: 0.5,
      radiusMap: {}
    };
  },

  ...spaceScatterModule
};
</script>

<style scoped>
.circle {
  cursor: pointer;
  transition: stroke-opacity 0.1s ease-out, stroke-width 0.1s ease-out;
}

.chartip-key {
  margin-top: 2px;
  margin-left: 5px;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* color: #373d41; */
}

.chartip-value {
  margin-top: 2px;
}
</style>