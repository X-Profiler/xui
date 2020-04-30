<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="tipData.loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="tipData.error" :message="tipData.error"></x-error-message>
    </div>

    <div class="x-modal-footer">
      <Button v-if="!tipData.loading" type="primary" ghost @click="closeTipModal">关闭</Button>
    </div>
  </div>
</template>

<script>
import tipContentModule from "@/javascripts/alarm/TipContent";

export default {
  ...tipContentModule
};
</script>