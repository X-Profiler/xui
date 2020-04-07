<template>
  <div class="wrapper">
    <div class="opt-group">
      <Button shape="circle" type="error" icon="md-trash"></Button>
      <div class="opt-label">删除</div>
    </div>
  </div>
</template>

<script>
import deletionModule from "@/javascripts/file/list/Deletion";

export default {
  props: {
    row: Object
  },

  ...deletionModule
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.opt-group {
  text-align: center;
  width: 50px;
}

.opt-label {
  margin-top: 5px;
  text-align: center;
  font-size: 12px;
  user-select: none;
  color: #e33900;
}
</style>