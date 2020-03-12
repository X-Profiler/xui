"use strict";

import * as moment from "moment";
import { dichotomy } from "../lib/utils";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  mounted() {
    this.area = this.$refs.area;

    this.setViewBox();
    window.addEventListener("resize", this.setViewBox.bind(this));

    this.$emit("mounted");
  },

  methods: {
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
      let crossDayFlag = false;
      for (let i = 0; i <= count; i++) {
        const time = moment(end).subtract(i * interval, "ms");
        const hour = time.hours();
        if (time.day() !== today && !crossDayFlag) {
          crossDayFlag = true;
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

    getPoints(yAxis) {
      const data = this.data;
      const xMaxData = data[data.length - 1] && data[data.length - 1].time;
      const xMinData = data[0] && data[0].time;
      const yMaxData = this.yAxisScale[this.yAxisScale.length - 1];
      if (!xMaxData || !xMinData || !yMaxData) {
        return [];
      }

      const xPointMap = this.xPointMap = [];
      const xValueMap = this.xValueMap = [];
      const xPoint = this.xPoint = [];

      const group = {};

      for (const dt of this.data) {
        const time = dt.time;
        // x position
        const xOffset =
          ((time - xMinData) / (xMaxData - xMinData)) *
          (this.viewWidth - this.paddingLeft - this.paddingRight);
        const xPosition = this.paddingLeft + xOffset;

        const timeKey = moment(time).format("YYYY-MM-DD HH:mm");
        xPointMap[xPosition] = [];
        xValueMap[timeKey] = [];
        xPoint.push(xPosition);

        for (const axis of yAxis) {
          if (!group[axis]) {
            group[axis] = [];
          }
          const value = dt[axis];

          // y position
          const yOffset =
            (value / yMaxData) *
            (this.viewHeight - this.paddingTop - this.paddingBottom);
          const yPosition = this.viewHeight - this.paddingBottom - yOffset;

          xPointMap[xPosition].push({
            xPosition,
            yPosition,
            color: this.getColor(axis),
            time: timeKey
          });
          xValueMap[timeKey].push({
            xPosition,
            yPosition,
            color: this.getColor(axis)
          });
          group[axis].push(`${xPosition},${yPosition}`);
        }
      }

      return group;
    },

    getColor(axis) {
      const index = this.yAxis.indexOf(axis);
      return this.colors[index % this.colors.length];
    },

    mouseover(event) {
      this.mousemove(event);
    },

    mousemove(event) {
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

      // set intersection offset x
      this.intersectionOffsetX = offsetX;

      // set dots
      const xPointMap = this.xPointMap;
      const [before, after] = dichotomy(this.xPoint, offsetX);
      if (Math.abs(offsetX - before < Math.abs(offsetX - after))) {
        this.dots = xPointMap[before];
      } else {
        this.dots = xPointMap[after];
      }

      // linkage
      if (this.dots.length) {
        this.$emit("linkage", this.dots[0].time);
      }
    },

    mouseleave() {
      this.intersectionOffsetX = 0;
      this.dots = [];
      this.$emit("hidden");
    },

    showTip(time) {
      this.dots = this.xValueMap[time] || [];
      if (this.dots.length) {
        this.intersectionOffsetX = this.dots[0].xPosition;
      }
    },

    hiddenTip() {
      this.intersectionOffsetX = 0;
      this.dots = [];
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

      const group = this.getPoints(this.yAxis);

      return Object.entries(group).map(([y, points]) => {
        const data = {
          key: y
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
    }
  }
};