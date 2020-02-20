<template>
  <div class="tooltip">
    <!-- title -->
    <slot name="header"></slot>

    <!-- content -->
    <slot name="content"></slot>

    <!-- footer -->
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tooltip {
  background: #f8f8f9;
  position: absolute;
  z-index: -9999;
  min-width: 300px;
  max-width: 500px;
}
</style>