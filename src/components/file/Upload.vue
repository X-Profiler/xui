<template>
  <div>
    <Button class="upload-button" type="info" size="small">
      <div>
        <Icon class="upload-icon" type="md-cloud-upload" />
        <span class="upload-text">上传文件</span>
      </div>
    </Button>
  </div>
</template>

<script>
import uploadModule from "@/javascripts/file/Upload";

export default {
  ...uploadModule
};
</script>

<style scoped>
.upload-button {
  margin-left: 20px;
}

.upload-icon {
  font-size: 13px;
}

.upload-text {
  font-size: 11px;
  margin-left: 6px;
}
</style>