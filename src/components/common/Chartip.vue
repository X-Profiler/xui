<template>
  <div ref="tooltip" class="tooltip box-shadow">
    <div :class="type">
      <!-- title -->
      <slot name="header"></slot>

      <!-- content -->
      <slot name="content"></slot>

      <!-- footer -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "left"
    };
  }
};
</script>

<style scoped>
.tooltip {
  /* display: none; */
  /* position: absolute; */
  /* z-index: 1000; */
  left: 0;
  top: 0;
  background-color: rgb(255, 255, 255);
  position: relative;
  max-width: 200px;
  border-radius: 3px;
  padding: 0 5px;
}

.left::before {
  content: " ";
  position: absolute;
  border: 12px solid;
  border-color: #dcdee2 transparent transparent;
  top: 30px;
}

.left::after {
  content: " ";
  position: absolute;
  border: 14px solid;
  border-color: #fff transparent transparent;
  top: 28px;
}

.left::before {
  left: -24px;
  transform: rotate(90deg);
}

.left::after {
  left: -24px;
  transform: rotate(90deg);
}
</style>