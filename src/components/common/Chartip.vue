<template>
  <div style="position: relative;">
    <div ref="chartip" class="chartip box-shadow" :style="chartipStyle">
      <div :class="type">
        <!-- title -->
        <slot name="header"></slot>

        <!-- content -->
        <slot name="content"></slot>

        <!-- footer -->
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { isNumber } from "@/javascripts/lib/utils";

export default {
  props: {
    noArrow: Boolean,
    maxWidth: Number,
    minWidth: Number
  },

  data() {
    return {
      type: ""
    };
  },

  mounted() {
    this.chartip = this.$refs.chartip;
  },

  methods: {
    show(event, minLegalY, maxLegalX, paddingRight = 0) {
      const style = this.chartip.style;
      style["opacity"] = 1;
      style["z-index"] = 1200;

      const tipComputedStyle = this.tipComputedStyle;
      const tipWidth = parseInt(tipComputedStyle.width, 10);
      const tipHeight = parseInt(tipComputedStyle.height);
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      const intervalX = 12;
      const intervalY = 10;

      if (offsetX + tipWidth + intervalX < maxLegalX) {
        style["left"] = offsetX + intervalX + "px";
        style["right"] = "unset";
        if (!this.noArrow) {
          this.type = "left";
        }
      } else {
        style["left"] = "unset";
        style["right"] = paddingRight + maxLegalX - offsetX + intervalX + "px";
        if (!this.noArrow) {
          this.type = "right";
        }
      }

      if (offsetY - tipHeight / 2 > minLegalY) {
        style["top"] = offsetY - tipHeight / 2 - intervalY + "px";
      } else {
        style["top"] = "0";
      }
    },

    hidden() {
      const style = this.chartip.style;
      style["opacity"] = 0;
      style["z-index"] = -9999;
    }
  },

  computed: {
    tipComputedStyle() {
      return window.getComputedStyle(this.chartip);
    },

    chartipStyle() {
      let style = "";
      if (!this.noArrow) {
        style += "padding: 0 5px;";
        style += "border-radius: 3px;";
      }

      if (isNumber(this.maxWidth)) {
        style += "max-width: " + this.maxWidth + "px;";
      }

      if (isNumber(this.minWidth)) {
        style += "min-width: " + this.minWidth + "px;";
      }

      return style;
    }
  }
};
</script>

<style scoped>
.chartip {
  opacity: 0;
  z-index: -9999;
  position: absolute;
  top: 0;
  background-color: rgb(255, 255, 255);
  /* max-width: 300px; */
  /* border-radius: 3px; */
  /* padding: 0 5px; */
  transition: opacity 0.1s ease;
  pointer-events: none;
  font-family: "Titillium Web", "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  font-size: 12px;
  color: #515a6e;
}

.left::before,
.right::before {
  content: " ";
  position: absolute;
  border: 8px solid;
  border-color: #dcdee2 transparent transparent;
  top: calc(50% - 8px);
  pointer-events: none;
}

.left::before {
  left: calc(-10px - 6px);
  transform: rotate(90deg);
}

.right::before {
  right: calc(-10px - 6px);
  transform: rotate(270deg);
}

.left::after {
  left: calc(-10px - 6px);
  transform: rotate(90deg);
}

.right::after {
  right: calc(-10px - 6px);
  transform: rotate(270deg);
}

.left::after,
.right::after {
  content: " ";
  position: absolute;
  border: 10px solid;
  border-color: #fff transparent transparent;
  top: calc(50% - 10px);
  pointer-events: none;
}
</style>