"use strict";

import { createLaterFunction, formatSize } from "@/javascripts/lib/utils";

export default {
  mounted() {
    this.chartip = this.$refs.chartip;
  },

  methods: {
    getOffsetX(index) {
      let offset = 0;
      for (let i = index - 1; i >= 0; i--) {
        const element = this.$refs[`smaller-${i}`];
        if (!element || !element[0]) {
          continue;
        }
        const width = parseInt(window.getComputedStyle(element[0]).width, 10);
        offset += width;
      }
      return offset;
    },

    ...createLaterFunction("mousemove", function (spaceType, event, small, index) {
      const height = this.height;
      const largerHeight = this.largerHeight / 100;
      const largerUsedHeight = this.largerUsedHeight / 100;
      let offsetX = event.offsetX;
      let offsetY = event.offsetY;
      const { larger, smaller } = this.sortedSpaceBefore;
      const spaceMap = this.spaceMap;
      switch (spaceType) {
        case "large_used_space": {
          offsetY += height * (1 - largerHeight) + height * largerHeight * (1 - largerUsedHeight);
          this.selectedSpace = `used_${larger.name}`;
          const { space_used_size } = spaceMap[larger.name];
          this.selectedSpaceSize = formatSize(space_used_size);
        }
          break;
        case "large_unused_space": {
          offsetY += height * (1 - largerHeight);
          this.selectedSpace = `unused_${larger.name}`;
          const { space_size, space_used_size } = spaceMap[larger.name];
          this.selectedSpaceSize = formatSize(space_size - space_used_size);
        }
          break;
        case "small_used_space": {
          const smallUsedHeight = small.usedHeight / 100;
          offsetX += this.getOffsetX(index);
          offsetY += height * (1 - largerHeight) * (1 - smallUsedHeight);
          this.selectedSpace = `used_${smaller[index].name}`;
          const { space_used_size } = spaceMap[smaller[index].name];
          this.selectedSpaceSize = formatSize(space_used_size);
        }
          break;
        case "small_unused_space": {
          offsetX += this.getOffsetX(index);
          this.selectedSpace = `unused_${smaller[index].name}`;
          const { space_size, space_used_size } = spaceMap[smaller[index].name];
          this.selectedSpaceSize = formatSize(space_size - space_used_size);
        }
          break;
        default:
          break;
      }

      const mouse = { offsetX, offsetY };
      this.chartip.show(mouse, 0, height, 0);
    }),

    ...createLaterFunction("mouseleave", function () {
      this.selectedSpace = undefined;
      this.selectedSpaceSize = undefined;
      this.chartip.hidden();
    }),
  },

  computed: {
    spaceMap() {
      const map = {};
      for (const { name, space_size, space_used_size } of this.data) {
        map[name] = { space_size, space_used_size };
      }

      return map;
    },

    sortedSpaceBefore() {
      const list = [];
      for (const { name, space_size, space_used_size } of this.before) {
        list.push({ name, space_size, space_used_size });
      }
      list.sort((o, n) => o.space_size < n.space_size ? 1 : -1);
      return {
        larger: list.shift(),
        smaller: list
      };
    },

    smallers() {
      const spaceMap = this.spaceMap;
      const { smaller } = this.sortedSpaceBefore;
      let total = 0;
      for (const { name } of smaller) {
        total += spaceMap[name].space_size;
      }

      const minWidth = 15;
      const smallers = smaller.map(small => {
        const { name } = small;
        const { space_size, space_used_size } = spaceMap[name];
        const width = space_size / total * 100;
        return {
          width: width < minWidth && width !== 0 ? minWidth : width,
          usedHeight: space_size === 0 ? 0 : space_used_size / space_size * 100,
          color: this.colors[name],
        };
      });

      return smallers;
    },

    largerHeight() {
      const spaceMap = this.spaceMap;
      const { larger: { name }, smaller } = this.sortedSpaceBefore;
      let smallerSize = 0;
      for (const { name } of smaller) {
        smallerSize += spaceMap[name].space_size;
      }

      const largerSize = spaceMap[name].space_size;
      return largerSize / (largerSize + smallerSize) * 100;
    },

    largerUsedHeight() {
      const { larger: { name } } = this.sortedSpaceBefore;
      const { space_size, space_used_size } = this.spaceMap[name];
      return space_used_size / space_size * 100;
    },

    largerColor() {
      const { larger: { name } } = this.sortedSpaceBefore;
      return this.colors[name];
    }
  }
};