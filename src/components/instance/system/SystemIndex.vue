<template>
  <div>
    <div class="overview">
      <div class="process-body-title">系统信息概览</div>
    </div>

    <div class="detail">
      <div class="process-body-title">系统信息周期详情</div>
    </div>
  </div>
</template>

<script>
import systemModule from "../../../javascripts/instance/system/SystemIndex";

export default {
  ...systemModule
};
</script>

<style scoped>
.detail {
  margin-top: 15px;
}

.process-body-title {
  font-weight: bold;
  text-align: left;
}
</style>