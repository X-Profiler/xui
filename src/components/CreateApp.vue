<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="new_app_loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="new_app_load_error" :message="new_app_load_error"></x-error-message>

      <div v-if="!new_app_loading && !new_app_load_error" class="x-modal-results new-app">
        <Input v-model="newAppName" placeholder="请输入您的应用名称">
          <span slot="prepend">应用名称</span>
        </Input>
        <p class="modal-attention">
          <strong>注意:</strong>
          <span style="margin-left: 10px;">应用名称最大长度不能超过 30 个字符</span>
        </p>
      </div>
    </div>

    <div class="x-modal-footer">
      <Button
        v-show="!new_app_loading"
        type="primary"
        ghost
        style="margin-right: 2px"
        @click="closeNewAppModal"
      >关闭</Button>
      <Button
        v-show="!new_app_loading"
        type="primary"
        style="margin-left: 8px"
        @click="submitNewAppCreation"
      >提交</Button>
    </div>
  </div>
</template>

<script>
import createAppModule from "@/javascripts/CreateApp";

export default {
  data() {
    return {
      newAppName: ""
    };
  },
  ...createAppModule
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
}
</style>