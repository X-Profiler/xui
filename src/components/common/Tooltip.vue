<template>
  <div class="tooltip">
    <!-- title -->
    <div class="header">
      <slot name="header"></slot>
    </div>

    <!-- content -->
    <div class="content">
      <slot name="content"></slot>
    </div>

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

.header {
  height: 20px;
  background-color: blue;
}

.content {
  padding: 10px 0;
}
</style>