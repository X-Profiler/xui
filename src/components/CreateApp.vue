<template>
  <div>
    <div class="x-modal-content" style="min-height: 120px;">
      <x-loading :loading="new_app_loading" type="dot" size="middle" :top="30"></x-loading>

      <x-error-message v-show="new_app_load_error" :message="new_app_load_error" :top="10"></x-error-message>

      <div
        v-if="!new_app_loading && !new_app_load_error && !new_app_data"
        class="x-modal-results new-app"
      >
        <Input v-model="newAppName" placeholder="请输入您的应用名称">
          <span slot="prepend">应用名称</span>
        </Input>
        <p class="modal-attention">
          <strong>注意:</strong>
          <span style="margin-left: 10px;">应用名称最大长度不能超过 30 个字符</span>
        </p>
      </div>

      <div v-if="!new_app_loading && !new_app_load_error && new_app_data" class="x-modal-results">
        <div
          v-for="(info, index) in newAppInfo"
          :key="index"
          class="new-app-group"
          :style="index !== 0 ? 'margin-top: 13px' : ''"
        >
          <div class="app-label">{{ info.label }} :</div>
          <div class="app-value">{{ info.value }}</div>
        </div>
      </div>
    </div>

    <div class="x-modal-footer">
      <Button
        v-if="!new_app_loading"
        type="primary"
        ghost
        style="margin-right: 2px"
        @click="closeNewAppModal"
      >关闭</Button>
      <Button
        v-if="!new_app_loading && !new_app_load_error && !new_app_data"
        type="primary"
        style="margin-left: 8px"
        @click="submitNewAppCreation"
      >提交</Button>
      <Button
        v-if="!new_app_loading && !new_app_load_error && new_app_data"
        type="primary"
        style="margin-left: 8px"
        :to="{path:`/app/${new_app_data.appId}/instance`}"
      >打开新应用</Button>
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
  font-size: 13px;
}

.new-app-group {
  display: flex;
  flex-wrap: wrap;
}

.app-label {
  font-weight: bold;
  width: 90px;
}

.app-value {
  margin-left: 20px;
}
</style>