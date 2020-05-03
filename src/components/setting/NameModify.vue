<template>
  <div>
    <div class="x-modal-content" style="min-height: 120px;">
      <x-loading :loading="loading" type="dot" size="middle" :top="30"></x-loading>

      <x-error-message v-show="error" :message="error" :top="10"></x-error-message>

      <div v-if="!loading && !error" class="x-modal-results new-app">
        <Input v-model="newAppName" placeholder="请输入新的应用名称">
          <span slot="prepend">应用名称</span>
        </Input>
        <p class="modal-attention">
          <strong>注意:</strong>
          <span style="margin-left: 10px;">应用名称最大长度不能超过 30 个字符</span>
        </p>
      </div>
    </div>

    <div class="x-modal-footer">
      <Button v-if="error" type="primary" ghost @click="closeModifyModal">关闭</Button>
      <Button v-if="!loading && !error" type="primary" ghost @click="closeModifyModal">取消</Button>
      <Button
        v-if="!loading && !error"
        type="primary"
        @click="submitNewAppName"
        style="margin-left: 8px"
      >提交</Button>
    </div>
  </div>
</template>

<script>
import nameModifyModule from "@/javascripts/setting/NameModify";

export default {
  data() {
    return {
      loading: false,
      error: undefined,
      newAppName: ""
    };
  },

  ...nameModifyModule
};
</script>

<style scoped>
.new-app {
  width: 100%;
  padding-top: 8px;
  user-select: none;
}

.modal-attention {
  margin-top: 10px;
  font-size: 13px;
}
</style>