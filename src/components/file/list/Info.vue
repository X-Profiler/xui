<template>
  <div class="file-info">
    <div class="file-path">{{ rowData.filePath }}</div>
    <div :class="'file-desc' + (rowData.fileStatus === 3 ? ' show-download' : ' show-executable')">
      <a
        v-if="rowData.executable"
        :href="rowData.fileStatus === 3 ? `/file/download?fileType=executable&fileId=${rowData.fileId}` : 'javascript:void(0)'"
      >{{ getExecutableLabel(rowData) }}</a>
      由
      <strong class="file-desc-heilight">{{ rowData.fileCreator }}</strong>
    </div>
    <div class="file-desc">
      于
      <strong class="file-desc-heilight">{{ rowData.createTime }}</strong> 创建在实例
      <strong class="file-desc-heilight">{{ rowData.createAgent }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  },

  data() {
    return {
      rowData: {}
    };
  },

  mounted() {
    this.rowData = this.row;
  },

  methods: {
    getExecutableLabel(rowData) {
      let label = "可执行文件";
      if(rowData.createAgent !== "upload") {
        label = rowData.executable;
      }

      return label;
    }
  }
};
</script>

<style scoped>
.file-info {
  font-family: PingFangSC-Regular, "Titillium Web", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}

.file-path {
  color: #474a4c;
  word-break: break-all;
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 14px;
}

.file-desc {
  font-size: 12px;
}

.file-desc-heilight {
  color: #474a4c;
}

.show-executable a {
  color: #9f9f9f;
  user-select: none;
  cursor: not-allowed;
}

.show-download a {
  color: #2689d6;
  user-select: none;
}

.file-desc.show-download a:hover {
  transition: all 0.1s ease-in;
  color: rgb(43, 133, 228, 0.75);
  font-style: italic;
  text-decoration: underline;
}
</style>