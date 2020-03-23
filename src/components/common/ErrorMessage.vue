<template>
  <div class="error" :style="style">
    <div class="container">
      <Icon class="icon" type="ios-alert-outline" />
      <div>{{ message }}</div>
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
.icon {
  font-size: 17px;
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>