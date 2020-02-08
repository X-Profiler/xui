'use strict';

export default {
  methods: {
    randomColor(index) {
      const length = this.colors.length;
      let color = this.colors[index % length];
      return color;
    }
  },

  computed: {
    noAppTip() {
      let tip = "";
      if (this.type === "myApps") {
        tip = "您的账号下暂无应用，点击右上角【创建新应用】按钮可以创建新应用";
      } else {
        tip = "您暂时没有加入任何应用";
      }
      return tip;
    }
  }
};