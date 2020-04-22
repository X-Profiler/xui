"use strict";

import { formatTime, createLaterFunction } from "@/javascripts/lib/utils";

export default {
  created() {
    for (let idx = 0; idx < this.data.length; idx++) {
      const dt = this.data[idx];
      this.xValueMap[dt[this.xAxis]] = Object.assign({
        index: idx,
        color: this.getFill(dt)
      }, dt)
    }
  },

  mounted() {
    this.histogram = this.$refs.histogram;
    this.chartip = this.$refs.chartip;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.histogram).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
      // this.viewHeight = (width / 5) * 3;
    },

    formatChartipTime(value) {
      return formatTime(value, false, true, 0);
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

    getXAxisLabel(index) {
      return (
        this.paddingLeft +
        ((this.viewWidth - this.paddingLeft - this.paddingRight) /
          this.xAxisScaleCountInner) *
        index
      );
    },

    getYAxisLabel(index) {
      return (
        this.paddingTop +
        ((this.viewHeight - this.paddingTop - this.paddingBottom) /
          this.yAxisScaleCountInner) *
        (this.yAxisScaleCountInner - index)
      );
    },

    getScale(count, axis) {
      if (!Array.isArray(this.data)) {
        return [];
      }
      const needZero = axis === this.yAxis && this.yAxisZero;
      const data = this.data.map(dt => dt[axis]);
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

    getRectHeight({ [this.yAxis]: value }) {
      const yMaxData = this.yAxisScale[this.yAxisScale.length - 1].value;
      const yMinData = this.yAxisScale[0].value;
      const height =
        yMaxData - yMinData
          ? ((value - yMinData) / (yMaxData - yMinData)) *
          (this.viewHeight - this.paddingTop - this.paddingBottom)
          : 0;
      return height;
    },

    getXPosition({ [this.xAxis]: value }) {
      const xMaxData = this.xAxisScale[this.xAxisScale.length - 1].value;
      const xMinData = this.xAxisScale[0].value;
      const offset =
        xMaxData - xMinData
          ? ((value - xMinData) / (xMaxData - xMinData)) *
          (this.viewWidth - this.paddingLeft - this.paddingRight)
          : 0;
      const xPosition = this.paddingLeft + offset;

      return xPosition;
    },

    getFill({ type }) {
      let color = "";
      switch (type) {
        case "scavenge":
          color = "#3498db";
          break;
        case "marksweep":
          color = "#ff9900";
          break;
        case "marking":
          color = "#6a5acd";
          break;
        default:
          break;
      }
      return color;
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

    mouseoverLabel(dt) {
      if (!this.single) {
        this.singleton(dt);
      }
    },

    mouseleaveLabel(dt) {
      if (!this.single) {
        this.restore(dt);
      }
    },

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

    ...createLaterFunction("mousemove", function (dt, index, event) {
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      const minLegalX = this.paddingLeft;
      const maxLegalX = this.viewWidth - this.paddingRight;
      const minLegalY = this.paddingTop;
      const maxLegalY = this.viewHeight - this.paddingBottom;

      if (offsetX < minLegalX || offsetX > maxLegalX) {
        return;
      }
      if (offsetY < minLegalY || offsetY > maxLegalY) {
        this.mouseleave();
        return;
      }

      // show chartip
      this.chartipData = Object.assign({
        index,
        color: this.getFill(dt)
      }, dt);
      const mouse = { offsetX, offsetY };
      this.chartip.show(mouse, minLegalY, maxLegalX, this.paddingRight);
    }),

    ...createLaterFunction("mouseleave", function () {
      this.chartip.hidden();
    }),

    showTip({ time, mouse }) {
      const maxLegalX = this.viewWidth - this.paddingRight;
      const minLegalY = this.paddingTop;
      this.chartipData = this.xValueMap[time];
      this.chartip.show(mouse, minLegalY, maxLegalX, this.paddingRight);
    },

    hiddenTip() {
      this.chartip.hidden();
    }
  },

  computed: {
    xAxisScaleCountInner() {
      return this.xAxisScaleCount || this.defaultXAxisScaleCount;
    },

    yAxisScaleCountInner() {
      return this.yAxisScaleCount || this.defaultYAxisScaleCount;
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

    yAxisScale() {
      const scales = this.getScale(this.yAxisScaleCountInner, this.yAxis);
      scales.reverse();
      return scales;
    },

    types() {
      const count = {};

      const types = Array.from(
        new Set(
          this.data.map(({ type }) => {
            if (count[type]) {
              count[type]++;
            } else {
              count[type] = 1;
            }
            return type;
          })
        )
      ).map(type => ({
        type
      }));

      types.sort((o, n) => (count[o.type] < count[n.type] ? 1 : -1));

      return types;
    },

    chartipTitle() {
      const { index, type } = this.chartipData;
      return `追踪周期内第 ${index} 次 GC ( ${type} )`;
    },
  }
};