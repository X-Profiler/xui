<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="loading" type="dot" size="middle" :top="30"></x-loading>

      <x-error-message v-show="error" :message="error" :top="10"></x-error-message>

      <div v-if="!loading && !error" class="warning">
        <Icon type="md-warning" class="warning-icon" />
        <div class="warning-label">删除应用后所有实例都会断开连接，且监控数据、性能分析文件等都会丢失，请谨慎操作！</div>
      </div>
    </div>

    <div class="x-modal-footer">
      <Button v-if="error" type="primary" ghost @click="closeDeleteModal">关闭</Button>
      <Button v-if="!loading && !error" type="primary" ghost @click="closeDeleteModal">取消</Button>
      <Button
        v-if="!loading && !error"
        type="primary"
        @click="submitAppDeletion"
        style="margin-left: 8px"
      >确认删除</Button>
    </div>
  </div>
</template>

<script>
import appDeleteModule from "@/javascripts/setting/AppDelete";

export default {
  data() {
    return {
      loading: false,
      error: undefined
    };
  },

  ...appDeleteModule
};
</script>

<style scoped>
.warning {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.warning-icon {
  color: #c45a65;
  transform: scale(1.2);
}

.warning-label {
  color: #c45a65;
  font-weight: bold;
  margin-left: 6px;
  /* font-size: 13px; */
}
</style>