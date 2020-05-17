<template>
  <div class="error" :style="style">
    <div class="container">
      <div class="icon-wrapper">
        <Icon class="icon" type="ios-alert-outline" />
      </div>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
import { isNumber } from "@/javascripts/lib/utils";

export default {
  props: {
    message: String,
    top: [Number, String]
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
    }
  }
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
</style>