<template>
  <div>
    <!-- button -->
    <Button class="upload-button" type="info" size="small" @click="openUploadModal">
      <div>
        <Icon class="upload-icon" type="md-cloud-upload" />
        <span class="upload-text">上传文件</span>
      </div>
    </Button>

    <!-- upload file -->
    <x-modal ref="uploadFile" title="上传性能文件" :padding="0" @canceled="closeUploadModal" hide-footer>
      <x-upload-file slot="content"></x-upload-file>
    </x-modal>
  </div>
</template>

<script>
import uploadModule from "@/javascripts/file/Upload";
import xUploadFile from "@/components/file/UploadFile";

export default {
  components: {
    "x-upload-file": xUploadFile
  },

  data() {
    return {
      modalQueryKey: "upload-file"
    };
  },

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
  font-size: 12px;
  margin-left: 6px;
}
</style>