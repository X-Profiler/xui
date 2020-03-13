"use strict";

import * as moment from "moment";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  created() {
    this.setLastTime();
  },

  mounted() {
    this.tip = this.$refs.tip;
  },

  methods: {
    setLineData(item) {
      item.selectedStyle = "";
    },

    setLastTime() {
      const list = [];
      const today = moment().day();
      let lastday = today;
      for (let i = 0; i < 24; i += 2) {
        const time = moment().subtract(i, "hours");
        const hour = time.hours();
        if (time.day() !== lastday) {
          lastday = time.day();
          list.push({ label: time.format("MM.DD"), value: week[time.day()] });
        } else {
          list.push({ label: hour < 12 ? "AM" : "PM", value: hour });
        }
      }
      this.times = list;
    },

    getProcessLineStyle(index) {
      const oneDay = 24 * 60 * 60 * 1000;
      const start = Date.now() - oneDay;
      const end = Date.now();

      const lineData = this.processes[index];
      const lineStart = lineData.startTime;
      const lineEnd = lineData.updateTime;

      if (lineEnd < lineStart || lineEnd <= start) {
        return "";
      }

      // add color
      let style = "background-color: " + lineData.color + ";";

      // margin-left
      if (lineStart > start) {
        style += "margin-left:" + (lineStart - start) / oneDay * 100 + "%;";
      }

      // margin-right
      if (end > (lineEnd + 3 * 60 * 1000)) {
        style += "margin-right:" + (end - lineEnd) / oneDay * 100 + "%;";
      }

      return style;
    },

    selectPid(index) {
      this.$emit("selectPid", index);
    },

    resetSelectedStyle(ignoreSelected = false) {
      for (const lineData of this.processes) {
        if (ignoreSelected && lineData.selected) {
          continue;
        }
        lineData.selected = false;
        lineData.selectedStyle = "";
      }
    },

    setBoxShadow(lineData) {
      const scaleY = 1.3;
      lineData.selectedStyle = `box-shadow: 0 0 0 2px ${lineData.color.replace(")", ", 0.4)")};`
        + `-webkit-transform: scaleY(${scaleY});transform: scaleY(${scaleY});`
        + "transition: box-shadow .1s";
    },

    updateSelectedProcess(lineData) {
      // add box shadow
      this.resetSelectedStyle();
      lineData.selected = true;
      this.setBoxShadow(lineData);
    },

    getLineWidth() {
      const width = window.getComputedStyle(this.$refs.line).width;
      return parseInt(width, 10);
    },

    mouseover(data, event) {
      // show box shadow
      this.resetSelectedStyle(true);
      this.setBoxShadow(data);

      // show tooltip
      this.tip.show(data, this.getLineWidth(), event);
    },

    mousemove(data, event) {
      // show tooltip
      this.tip.show(data, this.getLineWidth(), event);
    },

    mouseout() {
      // reset box shadow
      this.resetSelectedStyle(true);

      // remove tooltip
      this.tip.remove();
    }
  },
};