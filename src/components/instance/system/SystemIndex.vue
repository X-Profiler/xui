<template>
  <div>
    <div class="overview">
      <div class="process-body-title">系统信息概览</div>
      <x-overview class="overview-content"></x-overview>
    </div>

    <div class="detail">
      <div class="process-body-title">系统信息周期详情</div>
      <x-detail-info class="detail-content"></x-detail-info>
    </div>
  </div>
</template>

<script>
import systemModule from "../../../javascripts/instance/system/SystemIndex";
import overview from "./Overview";
import detailInfo from "./DetailInfo";

export default {
  components: {
    "x-overview": overview,
    "x-detail-info": detailInfo
  },

  ...systemModule
};
</script>

<style scoped>
.detail {
  margin-top: 15px;
}

.overview-content,
.detail-content {
  margin-top: 10px;
}

.process-body-title {
  font-weight: bold;
  text-align: left;
}
</style>