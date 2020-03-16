"use strict";

import * as moment from "moment";
import { dichotomy } from "../lib/utils";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  created() {
    this.setWidthMap();
  },

  mounted() {
    this.area = this.$refs.area;
    this.chartip = this.$refs.chartip;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));
  },

  methods: {
    setWidthMap(axis, width, other) {
      if (axis) {
        this.pathWidthMap[axis] = width;
        for (const y of this.yAxis) {
          if (y !== axis) {
            this.pathWidthMap[y] = other;
          }
        }
        return;
      }

      const map = {};
      for (const y of this.yAxis) {
        map[y] = 1.2;
      }
      this.pathWidthMap = map;
    },

    setViewBox() {
      const width = parseInt(window.getComputedStyle(this.area).width, 10);
      if (!width) {
        return;
      }
      this.viewWidth = width;
      // this.viewHeight = (width / 5) * 4;
    },

    getScale(count) {
      const fileds = this.yAxis;
      const data = this.data;
      let max = 0;
      for (const dt of data) {
        for (const field of fileds) {
          if (dt[field] && !isNaN(dt[field]) && dt[field] > max) {
            max = dt[field];
          }
        }
      }

      if (max === 0) {
        return [];
      }

      const interval = max / count;
      const scales = [];
      for (let i = 0; i <= count; i++) {
        scales.push(Math.round(max - interval * i));
      }
      return scales;
    },

    getTimeScale(count) {
      const data = this.data;
      if (!Array.isArray(data) || !data.length) {
        return [];
      }
      const start = data[0].time;
      const end = data[data.length - 1].time;
      const interval = (end - start) / count;
      const today = moment().day();
      const scales = [];
      let lastday = today;
      for (let i = 0; i <= count; i++) {
        const time = moment(end).subtract(i * interval, "ms");
        const hour = time.hours();
        if (time.day() !== lastday) {
          lastday = time.day();
          scales.push({ label: time.format("MM.DD"), value: week[time.day()] });
        } else {
          scales.push({ label: hour < 12 ? "AM" : "PM", value: hour });
        }
      }

      return scales;
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

    getPoints(yAxis, list) {
      const data = this.data;
      const xMaxData = data[data.length - 1] && data[data.length - 1].time;
      const xMinData = data[0] && data[0].time;
      const yMaxData = this.yAxisScale[this.yAxisScale.length - 1];
      if (!xMaxData || !xMinData || !yMaxData) {
        return [];
      }

      const xPointMap = this.xPointMap = {};
      const xValueMap = this.xValueMap = {};
      const xPoint = this.xPoint = [];

      const results = {};
      const group = {};
      for (const axis of yAxis) {
        results[axis] = [];
        group[axis] = [];
      }

      for (const dt of list) {
        const time = dt.time;
        // x position
        const xOffset =
          ((time - xMinData) / (xMaxData - xMinData)) *
          (this.viewWidth - this.paddingLeft - this.paddingRight);
        const xPosition = this.paddingLeft + xOffset;

        const timeKey = moment(time).format("YYYY-MM-DD HH:mm");
        xPointMap[xPosition] = { data: dt, dots: [] };
        xValueMap[timeKey] = { data: dt, dots: [] };
        if (yAxis.some(y => dt[y])) {
          xPoint.push(xPosition);
        }

        for (const axis of yAxis) {
          const value = dt[axis];
          if (value === null || isNaN(value)) {
            if (group[axis].length) {
              results[axis].push(group[axis]);
            }
            group[axis] = [];
            continue;
          }

          // y position
          const yOffset =
            (value / yMaxData) *
            (this.viewHeight - this.paddingTop - this.paddingBottom);
          const yPosition = this.viewHeight - this.paddingBottom - yOffset;

          xPointMap[xPosition].dots.push({
            axis,
            xPosition,
            yPosition,
            color: this.getColor(axis),
            time: timeKey
          });
          xValueMap[timeKey].dots.push({
            axis,
            xPosition,
            yPosition,
            color: this.getColor(axis)
          });
          group[axis].push(`${xPosition},${yPosition}`);
        }
      }

      for (const axis of yAxis) {
        results[axis].push(group[axis]);
      }

      return results;
    },

    getColor(axis) {
      const index = this.yAxis.indexOf(axis);
      return this.colors[index % this.colors.length];
    },

    filterDot(dots) {
      return dots.filter(dot => this.pathWidthMap[dot.axis]);
    },

    mouseover(event) {
      this.mousemove(event);
    },

    mousemove(event) {
      if (this.noData) {
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

      // set dots
      const xPointMap = this.xPointMap;
      const [before, after] = dichotomy(this.xPoint, offsetX);
      let xPointData;
      if (Math.abs(offsetX - before < Math.abs(offsetX - after))) {
        xPointData = xPointMap[before];
      } else {
        xPointData = xPointMap[after];
      }
      this.dots = this.filterDot(xPointData.dots);
      const trueOffsetX = this.dots.length ? this.dots[0].xPosition : offsetX;

      // set intersection offset x
      this.intersectionOffsetX = trueOffsetX;

      // show chartip
      this.chartipData = xPointData.data;
      const mouse = { offsetX: trueOffsetX, offsetY };
      this.chartip.show(mouse, minLegalY, maxLegalX);

      // linkage
      if (this.dots.length) {
        this.$emit("linkage", { time: this.dots[0].time, mouse });
      }

      // status
      if (this.showStatus) {
        this.$emit("status", xPointData.data);
      }
    },

    mouseleave() {
      this.intersectionOffsetX = 0;
      this.dots = [];
      this.chartip.hidden();
      this.$emit("hidden");
    },

    showTip({ time, mouse }) {
      const dots = this.xValueMap[time] && this.xValueMap[time].dots || [];
      this.dots = this.filterDot(dots);
      if (this.dots.length) {
        this.intersectionOffsetX = this.dots[0].xPosition;
        const maxLegalX = this.viewWidth - this.paddingRight;
        const minLegalY = this.paddingTop;
        this.chartipData = this.xValueMap[time].data;
        this.chartip.show({ offsetX: this.intersectionOffsetX, offsetY: mouse.offsetY }, minLegalY, maxLegalX);
      }

      if (this.showStatus) {
        const trend = this.xValueMap[time] && this.xValueMap[time].data || {};
        this.$emit("status", trend);
      }
    },

    hiddenTip() {
      this.intersectionOffsetX = 0;
      this.dots = [];
      this.chartip.hidden();
    },

    singleton(axis) {
      this.setWidthMap(axis, 2, 0);

      // scale
      const style = this.$refs[this.labelKey + axis][0].style;
      style["transform"] = "scale(1.2)";
    },

    restore(axis) {
      this.setWidthMap(axis, 1, 1);

      // scale
      const style = this.$refs[this.labelKey + axis][0].style;
      style["transform"] = "scale(1)";
    },

    mouseoverLabel(axis) {
      if (!this.single) {
        this.singleton(axis);
      }
    },

    mouseleaveLabel(axis) {
      if (!this.single) {
        this.restore(axis);
      }
    },

    choseLabel(axis) {
      for (const y of this.yAxis) {
        this.restore(y);
      }
      if (axis !== this.single) {
        this.single = undefined;
      }
      if (!this.single) {
        this.singleton(axis);
        this.single = axis;
      } else {
        this.restore(axis);
        this.single = undefined;
      }
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
      let scales = [];

      if (this.xAxis === "time") {
        scales = this.getTimeScale(this.xAxisScaleCountInner);
        scales.reverse();
      }

      return scales;
    },

    yAxisScale() {
      const scales = this.getScale(this.yAxisScaleCountInner);
      scales.reverse();
      return scales;
    },

    xGridFullWidth() {
      return (
        (this.viewWidth - this.paddingLeft - this.paddingRight) /
        this.xAxisScaleCountInner
      );
    },

    noData() {
      return !this.xAxisScale.length && !this.yAxisScale.length;
    },

    yAxisData() {
      if (this.noData) {
        return [];
      }

      const group = this.getPoints(this.yAxis, this.data);

      const results = Object.entries(group).map(([y, pointsList]) => {
        return pointsList.map(points => {
          const data = {
            axis: y
          };
          // points
          data.points = points.join(" ");
          // path
          const first = points.shift();
          const last = points.pop();
          let path = "";
          if (first && last) {
            points = points.map(p => `L${p}`);
            path += `M${first} ` + points.join(" ") + ` L${last}`;
            const buttom = this.viewHeight - this.paddingBottom;
            path += ` L${last.split(",")[0]},${buttom}`;
            path += ` L${first.split(",")[0]},${buttom} Z`;
          }
          data.path = path;
          // color
          const color = this.getColor(y);
          data.color = color;
          // data.bg = "rgba(36,185,13,0.4)";
          data.bg = color;
          return data;
        });
      });

      return results;
    },

    chartipTitle() {
      const chartipData = this.chartipData;
      if (chartipData.time) {
        return moment(chartipData.time).format("YYYY-MM-DD HH:mm:SS");
      }
    }
  }
};