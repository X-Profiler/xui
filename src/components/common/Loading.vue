<template>
  <div>
    <div v-show="loading" class="spin-loading" :style="style">
      <Spin size="large"></Spin>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    top: Number
  },

  computed: {
    style() {
      let style = "";
      if (this.top && !isNaN(this.top)) {
        style += "margin-top: " + this.top + "px;";
      }
      return style;
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