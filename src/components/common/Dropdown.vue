<template>
  <div class="dropdown">
    <div class="dropdown-list">
      <div style="padding-bottom: 6px;font-size: 12px;">{{ title }}</div>
      <div class="dropdown-icon-translate">
        <Icon class="dropdown-icon-rotate" type="ios-arrow-down" />
      </div>
    </div>

    <div :class="'dropdown-content box-shadow ' + posit">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    position: String
  },

  computed: {
    posit() {
      return this.position || "right";
    }
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown:hover .dropdown-content {
  opacity: 1;
  pointer-events: inherit;
  transform: translateY(6px);
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
  top: 18px;
  opacity: 0;
  border-radius: 4px;
  padding: 15px 0;
  transition: all 0.2s ease;
  min-width: 100px;
  z-index: 1000;
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