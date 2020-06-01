"use strict";

import { formatTime, createLaterFunction } from "@/javascripts/lib/utils";

export default {
  created() {
    for (let idx = 0; idx < this.data.length; idx++) {
      const dt = this.data[idx];
      this.xValueMap[dt[this.xAxis]] = Object.assign({
        index: idx,
        color: this.getFill(dt)
      }, dt);
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
      this.intersectionFixed = false;
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

    getScale(count, axis, filterType) {
      let data = this.data;
      if (!Array.isArray(data)) {
        return [];
      }
      if (filterType) {
        data = data.filter(dt => this.needShow(dt, filterType));
      }
      if (!data.length) {
        return [];
      }
      const needZero = axis === this.yAxis && this.yAxisZero;
      data = data.map(dt => dt[axis]);
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
      if (interval === 0) {
        return [{ label: max, value: max }];
      }
      const scales = [];
      for (let i = 0; i <= count; i++) {
        const scale = max - interval * i;

        scales.push({
          label: interval <= 1 ? Number(scale.toFixed(2)) : Math.ceil(scale),
          value: scale
        });
      }
      return scales;
    },

    getRectHeight({ [this.yAxis]: value, type, positive }) {
      if (!this.needShow({ type, positive })) {
        return 0;
      }

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

    getFill({ type, positive }) {
      let color = "";

      if (this.yAxis === "pause") {
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
      }

      if (this.yAxis === "changeAbs") {
        if (positive || type === "increment") {
          color = "#c45a65";
        } else {
          color = "#2a9446";
        }
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

    ...createLaterFunction("mouseoverLabel", function (dt) {
      if (!this.single) {
        this.singleton(dt);
      }
    }),

    ...createLaterFunction("mouseleaveLabel", function (dt) {
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

    ...createLaterFunction("mousemove", function (dt, index, event) {
      if (this.intersectionFixed) {
        return;
      }

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

      this.setRectStyle(this.chartipData, 1, 0);
      this.setRectStyle(dt, 0.5, "5px");
      // show chartip
      this.chartipData = Object.assign({
        index,
        color: this.getFill(dt)
      }, dt);
      const mouse = { offsetX, offsetY };
      this.chartip.show(mouse, minLegalY, maxLegalX, this.paddingRight);

      this.$emit("linkage", { time: dt[this.xAxis], mouse });
    }),

    ...createLaterFunction("mouseleave", function () {
      if (this.intersectionFixed) {
        return;
      }
      this.chartip.hidden();
      this.$emit("hidden");
      this.setRectStyle(this.chartipData, 1, 0);
    }),

    setRectStyle(dt, opacity, width) {
      const element = this.$refs[`${this.histogramLabel}-${dt.index}`];
      if (!element || !element[0]) {
        return;
      }
      const style = element[0].style;
      style["stroke-opacity"] = opacity;
      style["stroke-width"] = width;
    },

    ...createLaterFunction("showTip", function ({ time, mouse }) {
      const maxLegalX = this.viewWidth - this.paddingRight;
      const minLegalY = this.paddingTop;
      const dt = this.xValueMap[time];
      this.setRectStyle(this.chartipData, 1, 0);
      if (!this.needShow(dt)) {
        this.chartip.hidden();
        return;
      }
      this.setRectStyle(dt, 0.5, "5px");
      this.chartipData = dt;
      this.chartip.show(mouse, minLegalY, maxLegalX, this.paddingRight);
    }),

    ...createLaterFunction("hiddenTip", function () {
      this.chartip.hidden();
      this.setRectStyle(this.chartipData, 1, 0);
    }),

    needShow(dt, filter) {
      const filterType = filter || this.filterType;

      if (!filterType) {
        return true;
      }

      if (this.yAxis === "pause") {
        return filterType === dt.type;
      }

      if (this.yAxis === "changeAbs") {
        return dt.positive === (filterType === "increment");
      }
    },

    fixIntersection(dt, index, event) {
      this.intersectionFixed = !this.intersectionFixed;
      this.$emit("broadcast", { intersectionFixed: this.intersectionFixed });
      if (!this.intersectionFixed) {
        this.mousemove(dt, index, event);
      }
    },

    handleBroadcase(data) {
      const { intersectionFixed } = data;
      this.intersectionFixed = intersectionFixed;
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
      const scales = this.getScale(this.yAxisScaleCountInner, this.yAxis, this.filterType);
      scales.reverse();
      return scales;
    },

    types() {
      const count = {};
      let types = [];

      if (this.yAxis === "pause") {
        types = Array.from(
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

        types = types.map(({ type }) => ({ type, label: type }));
      }

      if (this.yAxis === "changeAbs") {
        types = [
          { type: "reduce", label: "GC 后堆内存大小减少" },
          { type: "increment", label: "GC 后堆内存大小增加" }
        ];
      }

      return types;
    },

    chartipTitle() {
      const { index, type } = this.chartipData;
      return `追踪周期内第 ${index} 次 GC ( ${type} )`;
    },
  }
};