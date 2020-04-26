"use strict";

import { formatTime, createLaterFunction } from "@/javascripts/lib/utils";

export default {
  created() {
    for (let idx = 0; idx < this.data.length; idx++) {
      const spaces = this.yAxis
        .map(item => item.value !== "all_spaces" && item.value)
        .filter(item => item);
      const dt = this.data[idx];
      spaces.sort((o, n) => dt[o] < dt[n] ? 1 : -1);
      const sizes =
        spaces.map(space => `${dt[`${space}_positive`] || dt[space] === 0 ? "+" : "-"}${Number(dt[space].toFixed(2))}`);
      const colors =
        spaces.map(space => dt[`${space}_positive`] ? "#c45a65" : "#2a9446");

      this.xValueMap[dt[this.xAxis]] = Object.assign({
        index: idx,
        showAll: true,
        spaces,
        sizes,
        colors,
        color: this.getColor(dt, { value: "all_spaces" })
      }, dt);
    }

    const validDataMap = this.validDataMap;
    for (const dt of this.data) {
      for (const { value: space } of this.yAxis) {
        if (!dt[space]) {
          continue;
        }
        if (!validDataMap[space]) {
          validDataMap[space] = 1;
        } else {
          validDataMap[space]++;
        }
      }
    }
  },

  mounted() {
    this.scatter = this.$refs["space-scatter"];
    this.chartip = this.$refs.chartip;

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

    needShowRadius(index, space) {
      const maxRadius = 100;
      const count = this.validDataMap[space];
      if (count > maxRadius) {
        const interval = Math.round(count / maxRadius);
        return index % interval === 1;
      } else {
        return true;
      }
    },

    getRadius(info, { value }) {
      const size = info[value];
      if (!size || !this.needShow(info, value)) {
        return 0;
      }
      const maxSize = 16;
      const minSize = 4;
      // const spaceInfo = this.spacesInfo[value];
      const spaceInfo = this.spacesInfo["total"];
      let radius = (size / spaceInfo) * maxSize;
      radius = radius > maxSize ? maxSize : radius;
      radius = radius < minSize ? this.needShowRadius(info.index, value) ? minSize : 0 : radius;

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

    setCircleStyle(dt, opacity, width, opacity2, axis) {
      axis = axis || dt.axis;
      if (!axis) {
        return;
      }
      let axises;
      if (Array.isArray(axis)) {
        axises = axis;
      } else {
        axises = [axis];
      }

      for (const axis of axises) {
        const element = this.$refs[`${this.circleLabel}-${dt.index}-${axis}`];
        if (!element || !element[0]) {
          continue;
        }
        const style = element[0].style;
        style["stroke-opacity"] = opacity;
        style["stroke-width"] = width;
        style["opacity"] = opacity2;
      }
    },

    ...createLaterFunction("mousemove", function (dt, axis, index, event) {
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

      this.setCircleStyle(this.chartipData, 1, 0, this.circleOpacity);
      this.setCircleStyle(dt, 0.5, "13px", 1, axis.value);
      // show chartip
      this.chartipData = Object.assign(
        {
          index,
          axis: axis.value,
          change: Number(dt[axis.value].toFixed(2)),
          positive: dt[`${axis.value}_positive`] ? "+" : "-",
          color: this.getColor(dt, axis)
        },
        dt
      );
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
      this.setCircleStyle(this.chartipData, 1, 0, this.circleOpacity);
    }),

    fixIntersection(dt, axis, index, event) {
      this.intersectionFixed = !this.intersectionFixed;
      this.$emit("broadcast", { intersectionFixed: this.intersectionFixed });
      if (!this.intersectionFixed) {
        this.mousemove(dt, axis, index, event);
      }
    },

    handleBroadcase(data) {
      const { intersectionFixed } = data;
      this.intersectionFixed = intersectionFixed;
    },

    ...createLaterFunction("showTip", function ({ time, mouse }) {
      const maxLegalX = this.viewWidth - this.paddingRight;
      const minLegalY = this.paddingTop;
      const dt = this.xValueMap[time];
      const spaces = this.yAxis.map(item => item.value);
      this.setCircleStyle(this.chartipData, 1, 0, this.circleOpacity, spaces);
      // if (!this.needShow(dt, "all_spaces")) {
      //   this.chartip.hidden();
      //   return;
      // }
      this.setCircleStyle(dt, 0.5, "13px", 1, spaces);
      this.chartipData = dt;
      const { offsetX, offsetY } = mouse;
      this.chartip.show({ offsetX: offsetX + 45, offsetY }, minLegalY, maxLegalX, this.paddingRight);
    }),

    ...createLaterFunction("hiddenTip", function () {
      this.chartip.hidden();
      const spaces = this.yAxis.map(item => item.value);
      this.setCircleStyle(this.chartipData, 1, 0, this.circleOpacity, spaces);
    })
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
      const map = { total: 0 };
      for (const dt of this.data) {
        for (const { value } of this.yAxis) {
          if (map[value] !== undefined) {
            if (map[value] < dt[value]) {
              map[value] = dt[value];
            }
          } else {
            map[value] = dt[value];
          }

          if (map.total < dt[value]) {
            map.total = dt[value];
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
    },

    chartipTitle() {
      const { index, type } = this.chartipData;
      return `追踪周期内第 ${index} 次 GC ( ${type} )`;
    }
  }
};