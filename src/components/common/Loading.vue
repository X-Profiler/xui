<template>
  <div>
    <div v-show="loading" class="spin-loading" :style="style">
      <Spin :size="spinSize"></Spin>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    top: Number,
    size: String
  },

  computed: {
    style() {
      let style = "";
      if (this.top && !isNaN(this.top)) {
        style += "margin-top: " + this.top + "px;";
      }
      return style;
    },
    spinSize() {
      return this.size || "large";
    }
  }
};
</script>

<style scoped>
.spin-loading {
  display: inline-block;
  position: relative;
}
</style>