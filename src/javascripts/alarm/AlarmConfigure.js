"use strict";

export default {
  methods: {
    checkNeedShow({ type, dependent, dependentValue }, showType) {
      const needShow = showType === "label" || type === showType;

      if (dependent === "checkbox") {
        return needShow && this.checkboxMap[dependentValue];
      }

      return needShow;
    }
  }
};