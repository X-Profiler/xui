<template>
  <div class="error" :style="style">
    <div class="icon">
      <Icon type="ios-alert-outline" />
    </div>
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    top: [Number, String]
  },

  computed: {
    style() {
      let style = "";
      if (this.top) {
        if (!isNaN(this.top)) {
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
}
</style>