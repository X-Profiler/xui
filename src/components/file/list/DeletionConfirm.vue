<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="error" :message="error"></x-error-message>

      <div v-if="success" class="confirm">
        <div>云端文件已经成功删除</div>
      </div>

      <div v-if="!loading && !error && !success" class="confirm">
        <div>确认删除文件 {{ deletionData.filePath }} ?</div>
      </div>
    </div>

    <div class="x-modal-footer">
      <div v-if="!loading">
        <Button type="primary" ghost @click="closeDeletionModal">关闭</Button>
        <Button
          v-if="!error && !success"
          type="primary"
          style="margin-left: 8px"
          @click="submitFileDeletion"
        >删除</Button>
      </div>
    </div>
  </div>
</template>

<script>
import deletionConfirmModule from "@/javascripts/file/list/DeletionConfirm";

export default {
  data() {
    return {
      loading: false,
      error: undefined,
      success: false
    };
  },

  ...deletionConfirmModule
};
</script>

<style scoped>
.confirm {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>