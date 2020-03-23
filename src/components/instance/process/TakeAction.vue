<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="take_action_loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="take_action_load_error" :message="take_action_load_error"></x-error-message>

      <div v-if="!take_action_loading && !take_action_load_error" class="x-modal-results">
        <p>
          {{ actionTip }}操作成功，请访问
          <router-link class="x-modal-link" :to="{path:`/app/${appId}/file`}" target="_blank">文件列表</router-link>&nbsp;查看详情。
        </p>
        <p style="margin-top: 8px;">生成文件路径: {{ take_action_data }}</p>
      </div>
    </div>

    <div class="x-modal-footer">
      <Button v-show="!take_action_loading" type="primary" ghost @click="closeTakeActionModal">关闭</Button>
    </div>
  </div>
</template>

<script>
import takeActionModule from "../../../javascripts/instance/process/TakeAction";

export default {
  ...takeActionModule
};
</script>