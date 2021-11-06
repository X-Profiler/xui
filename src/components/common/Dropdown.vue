<template>
  <div
    class="dropdown"
    @mouseover="mouseover()"
    @mousemove="mousemove()"
    @mouseout="mouseout()"
    :style="dropdownStyle"
  >
    <div class="dropdown-list">
      <slot name="title">
        <div :style="titleStyle">{{ title }}</div>
      </slot>
      <div v-show="!notShowArrow" class="dropdown-icon-translate">
        <Icon class="dropdown-icon-rotate" type="ios-arrow-down" />
      </div>
    </div>

    <div
      ref="dropdown-content"
      :class="'dropdown-content box-shadow ' + posit"
      :style="contentStyle"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { isNumber } from "@/javascripts/lib/utils";

export default {
  props: {
    title: String,
    position: String,
    transformY: Number,
    color: String,
    minWidth: Number,
    fontSize: Number,
    paddingBottom: Number,
    notShowArrow: {
      type: Boolean,
      default: false,
    },
    rawTop: {
      type: Number,
      default: 18,
    },
    contentTop: {
      type: Number,
      default: 15,
    },
    contentBottom: {
      type: Number,
      default: 15,
    },
    contentLeft: {
      type: Number,
      default: 0,
    },
    contentRight: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    this.style = this.$refs["dropdown-content"].style;
  },

  methods: {
    mouseover() {
      const style = this.style;
      style["opacity"] = 1;
      style["pointer-events"] = "inherit";
      style["transform"] = `translateY(${this.ty})`;
    },

    mousemove() {
      const style = this.style;
      style["opacity"] = 1;
      style["pointer-events"] = "inherit";
      style["transform"] = `translateY(${this.ty})`;
    },

    mouseout() {
      const style = this.style;
      style["opacity"] = 0;
      style["pointer-events"] = "none";
      style["transform"] = "translateY(0)";
    },
  },

  computed: {
    posit() {
      return this.position || "right";
    },

    ty() {
      return (this.transformY || 6) + "px";
    },

    dropdownStyle() {
      let style = "";

      if (this.color) {
        style += `color: ${this.color};`;
      }

      return style;
    },

    contentStyle() {
      let style = "";

      if (isNumber(this.minWidth)) {
        style += `min-width: ${this.minWidth}px;`;
      } else {
        style += "min-width: 100px;";
      }

      const rawTop = `top: ${this.rawTop}px;`;
      const padding = `padding: ${this.contentTop}px ${this.contentRight}px ${this.contentBottom}px ${this.contentLeft}px;`;

      style += rawTop + padding;

      return style;
    },

    titleStyle() {
      const baseStyle = "width: 100%; text-align: center;";

      const fontSize = this.fontSize || 12;
      const paddingBottom = isNumber(this.paddingBottom)
        ? this.paddingBottom
        : 6;
      const customStyle = `padding-bottom: ${paddingBottom}px;font-size: ${fontSize}px;`;

      return baseStyle + customStyle;
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-list {
  text-align: center;
  cursor: pointer;
  display: flex;
}

.dropdown-icon-rotate {
  margin-left: 3px;
}

.dropdown:hover .dropdown-icon-translate {
  transform: translateY(-3px);
}

.dropdown:hover .dropdown-icon-rotate {
  transform: rotate(180deg);
  transition: transform 0.1s ease-out;
}

.dropdown-content {
  font-family: PingFangSC-Regular, "Titillium Web", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  color: #515a6e;
  background-color: #fff;
  pointer-events: none;
  position: absolute;
  opacity: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  z-index: 1000;
  white-space: nowrap;
}

.dropdown-content.right {
  right: 0;
}

.dropdown-content.left {
  left: 0;
}

.dropdown-content::before {
  width: 10px;
  height: 10px;
  display: block;
  content: " ";
  background-color: #fff;
  transform: rotate(45deg);
  position: absolute;
  top: -5px;
  border-top: 1px solid #e8eaec;
  border-left: 1px solid #e8eaec;
}

.dropdown-content::after {
  width: 100%;
  height: 10px;
  display: block;
  content: " ";
  position: absolute;
  top: -10px;
}

.dropdown-content.right::before {
  right: 20px;
}

.dropdown-content.left::before {
  left: 20px;
}

.dropdown-content.center::before {
  left: calc(50% - 5px);
}
</style>