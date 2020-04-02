<template>
  <div>
    <div class="x-modal-content">
      <!-- upload content -->
      <div class="container">
        <div class="wrapper">
          <!-- file types -->
          <div class="group">
            <div>文件类型</div>
            <Select
              class="agent-selector upload-selector"
              v-model="selectedFileType"
              placeholder="请选择文件类型"
            >
              <Option
                v-for="(item, index) in fileTypes"
                :key="index"
                :value="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>

          <!-- upload file -->
          <div v-for="(upload, index) in uploads" :key="index" class="group item">
            <div class="solid">{{ upload.title }}</div>
            <Upload
              class="upload-button solid"
              :before-upload="file=> handleUpload(file, upload)"
              action
            >
              <Button type="primary">
                <Icon class="upload-icon" type="md-cloud-upload" />
                <span class="upload-text">{{ upload.button }}</span>
              </Button>
            </Upload>
            <div class="placeholder"></div>
            <div class="filename" v-html="upload.tip"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="x-modal-footer">
      <Button type="primary" ghost @click="closeUploadModal">关闭</Button>
      <Button type="primary" style="margin-left: 8px" @click="uploadFile">上传</Button>
    </div>
  </div>
</template>

<script>
import uploadFileModule from "@/javascripts/file/UploadFile";

export default {
  data() {
    return {
      selectedFileType: undefined,
      uploads: [],
      defaultFileTip: "未选择任何文件",
      normalUploads: [
        {
          title: "性能文件",
          button: "选择性能文件",
          tip: undefined,
          valid: [],
          file: undefined
        }
      ],
      coredumpUploads: [
        {
          title: "核心转储",
          button: "选择核心转储",
          tip: undefined,
          valid: ["core"],
          file: undefined
        },
        {
          title: "执行文件",
          button: "选择执行文件",
          tip: undefined,
          valid: ["node"],
          file: undefined
        }
      ]
    };
  },

  ...uploadFileModule
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  max-width: 350px;
}

.group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.item {
  margin-top: 13px;
}

.upload-selector {
  text-align: left;
  width: 180px;
  margin-left: 20px;
}

.upload-button {
  margin-left: 20px;
}

.upload-icon {
  font-size: 15px;
  margin-top: 4px;
}

.upload-text {
  font-size: 12px;
  margin-left: 8px;
}

.solid {
  flex-shrink: 0;
}

.placeholder {
  margin-left: 13px;
  width: 120px;
}

.filename {
  position: absolute;
  font-size: 13px;
  text-align: left;
  left: 293px;
  word-break: break-all;
}
</style>