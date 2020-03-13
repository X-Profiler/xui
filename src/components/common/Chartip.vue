<template>
  <div ref="tooltip" class="tooltip box-shadow">
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
  props: {}
};
</script>

<style scoped>
.tooltip {
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -9999;
  display: none;
}
</style>