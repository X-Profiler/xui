<template>
  <div ref="tooltip" class="tooltip">
    <!-- title -->
    <slot name="header"></slot>

    <!-- content -->
    <slot name="content"></slot>

    <!-- footer -->
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.tooltip = this.$refs.tooltip;
  },

  methods: {
    showToolTip() {
      const style = this.tooltip.style;
      // enable tooltip
      style.zIndex = 9999;
      style.display = "block";
    },

    removeToolTip() {
      const style = this.tooltip.style;
      style.zIndex = -9999;
      style.display = "none";
    }
  }
};
</script>

<style scoped>
.tooltip {
  background: #f8f8f9;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -9999;
  min-width: 300px;
  max-width: 500px;
  display: none;
}
</style>