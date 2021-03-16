<template>
  <div class="error" :style="style">
    <!-- default theme -->
    <transition name="slide-noward">
      <div v-show="theme === 0" class="container">
        <div v-show="icon" class="icon-wrapper">
          <Icon class="icon" type="ios-alert-outline" />
        </div>
        <span>{{ message }}</span>
      </div>
    </transition>

    <!-- theme 1: left / right -->
    <transition name="slide-noward">
      <div v-show="theme === 1" style="width: 100%">
        <div class="theme-1 leftpart">{{ message && message.left }}</div>
        <div class="theme-1 rightpart">{{ message && message.right }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { isNumber } from "@/javascripts/lib/utils";

export default {
  props: {
    message: [String, Object],
    top: [Number, String],
    theme: {
      type: Number,
      default: 0,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    style() {
      let style = "";
      if (this.top) {
        if (isNumber(this.top)) {
          style += "margin-top: " + this.top + "px;";
        } else {
          style += "margin-top: " + this.top + ";";
        }
      }
      return style;
    },
  },
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-block;
  line-height: 16px;
}

.icon {
  font-size: 16px;
  margin-right: 4px;
}

.error {
  color: #515a6e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  width: 100%;
}

.theme-1 {
  display: inline-block;
}

.leftpart {
  width: 50%;
  text-align: right;
}

.rightpart {
  width: 50%;
  padding-left: 5px;
}
</style>