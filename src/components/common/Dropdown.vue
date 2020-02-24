<template>
  <div class="dropdown">
    <div class="dropdown-list">
      {{ title }}
      <div class="dropdown-icon-rotate">
        <Icon class="dropdown-icon-translate" type="ios-arrow-down" />
      </div>
    </div>

    <div class="dropdown-content box-shadow" :style="contentStyle">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    right: Number
  },

  computed: {
    contentStyle() {
      let style = "";

      if (this.right) {
        style += "right: " + this.right + "px;";
      }

      return style;
    }
  }
};
</script>

<style scoped>
.dropdown-list {
  text-align: center;
  cursor: pointer;
  display: flex;
}

.dropdown:hover .dropdown-icon-translate {
  transform: translateY(1px);
}

.dropdown-icon-rotate {
  margin-left: 3px;
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
  padding: 10px 0;
  transition: all 0.2s ease;
  min-width: 100px;
  z-index: 1000;
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
  right: 20px;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
  pointer-events: inherit;
  transform: translateY(6px);
}
</style>