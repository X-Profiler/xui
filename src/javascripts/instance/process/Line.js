"use strict";

import * as moment from "moment";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  created() {
    this.setLastTime();
  },

  methods: {
    setLineData(item) {
      item.selectedStyle = "";
      item.selected = false;
    },

    setLastTime() {
      const list = [];
      const today = moment().day();
      for (let i = 0; i < 24; i += 2) {
        const time = moment().subtract(i, "hours");
        const hour = time.hours();
        if (time.day() !== today && hour === 23) {
          list.push({ label: time.format("MM.DD"), value: week[time.day()] });
        } else {
          list.push({ label: hour < 12 ? "AM" : "PM", value: hour });
        }
      }
      this.times = list;
    },

    getProcessLineStyle(index) {
      const oneDay = 24 * 60 * 60 * 1000;
      const end = Date.now();
      const start = Date.now() - oneDay;
      const lineData = this.processes[index];

      // add color
      let style = "background-color: " + lineData.color + ";";

      // add width
      style += "width: " + (lineData.updateTime - lineData.startTime) / oneDay * 100 + "%;";

      // margin-left
      if (lineData.startTime > start) {
        style += "margin-left:" + (lineData.startTime - start) / oneDay * 100 + "%;";
      }

      // margin-right
      if (end - lineData.updateTime > 2 * 60 * 1000) {
        style += "margin-right:" + (end - lineData.updateTime) / oneDay * 100 + "%;";
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
    },

    updateSelectedProcess(lineData) {
      // add box shadow
      this.resetSelectedStyle();
      lineData.selected = true;
      this.setBoxShadow(lineData);

      // set process data
      this.processData = lineData;
    },

    mouseover(data) {
      this.resetSelectedStyle(true);
      this.setBoxShadow(data);
    },

    mousemove() {
    },

    mouseout() {
      this.resetSelectedStyle(true);
    }
  },
}