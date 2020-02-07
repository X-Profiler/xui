'use strict';

export default {
  methods: {
    randomColor(index) {
      const length = this.colors.length;
      let color = this.colors[index % length];
      return color;
    }
  }
};