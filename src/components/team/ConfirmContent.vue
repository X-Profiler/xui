<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="confirmData.loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="confirmData.error" :message="confirmData.error"></x-error-message>

      <div
        v-if="!confirmData.loading && !confirmData.error && !confirmData.success"
        class="confirm"
        v-html="confirmData.content"
      ></div>
    </div>

    <div class="x-modal-footer">
      <div v-if="!confirmData.loading">
        <Button type="primary" ghost @click="closeConfirmModal">关闭</Button>
        <Button
          v-if="!confirmData.error && !confirmData.success"
          type="primary"
          style="margin-left: 8px"
          @click="submitRequest"
        >确认</Button>
      </div>
    </div>
  </div>
</template>

<script>
import confirmContentModule from "@/javascripts/team/ConfirmContent";

export default {
  ...confirmContentModule
};
</script>