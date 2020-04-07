<template>
  <div>
    <div class="x-modal-content">{{ errorModalData.message }}</div>

    <div class="x-modal-footer">
      <Button type="primary" ghost @click="closeErrorModal">关闭</Button>
    </div>
  </div>
</template>

<script>
import operationErrorModule from "@/javascripts/file/list/OperationError";

export default {
  ...operationErrorModule
};
</script>