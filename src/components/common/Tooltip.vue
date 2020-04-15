<template>
  <div ref="tooltip" class="tooltip box-shadow" :style="getTooltipStyle">
    <!-- title -->
    <slot name="header"></slot>

    <!-- content -->
    <slot name="content"></slot>

    <!-- footer -->
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { isNumber } from "../../javascripts/lib/utils";

export default {
  props: {
    minWidth: Number
  },

  mounted() {
    this.tooltip = this.$refs.tooltip;
  },

  methods: {
    getComputedStyle() {
      return window.getComputedStyle(this.tooltip);
    },

    showToolTip(maxWidth, event, offsetX = 0) {
      const style = this.tooltip.style;
      // enable tooltip
      style.zIndex = 9999;
      style.display = "block";

      // position
      const computedStyle = this.getComputedStyle();
      const tooltipHeight = parseInt(computedStyle.height, 10);
      const tooltipWidth = parseInt(computedStyle.width, 10);

      const pageX = event.pageX - offsetX;
      const pageY = event.pageY;

      const x =
        pageX + 10 + tooltipWidth < maxWidth
          ? pageX + 10
          : pageX - 10 - tooltipWidth;
      const y =
        pageY - 10 > tooltipHeight ? pageY - (tooltipHeight + 10) : pageY + 10;
      style.left = x + "px";
      style.top = y + "px";
    },

    removeToolTip() {
      const style = this.tooltip.style;
      style.zIndex = -9999;
      style.display = "none";
      style.left = "0";
      style.top = "0";
    }
  },

  computed: {
    getTooltipStyle() {
      let style = "";
      if (isNumber(this.minWidth)) {
        style += `min-width: ${this.minWidth}px;`;
      }

      return style;
    }
  }
};
</script>

<style scoped>
.tooltip {
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -9999;
  min-width: 300px;
  max-width: 500px;
  display: none;
}
</style>