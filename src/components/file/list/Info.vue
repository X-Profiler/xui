<template>
  <div class="file-info">
    <div class="file-path">{{ row.filePath }}</div>
    <div class="file-desc">
      <a v-if="row.executable">可执行文件</a>
      由
      <strong class="file-desc-heilight">{{ row.fileCreator }}</strong>
    </div>
    <div class="file-desc">
      于
      <strong class="file-desc-heilight">{{ row.createTime }}</strong> 创建在实例
      <strong class="file-desc-heilight">{{ row.createAgent }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
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
}

.file-desc {
  font-size: 12px;
}

.file-desc-heilight {
  color: #474a4c;
}

.file-desc a {
  color: #2689d6;
  user-select: none;
}

.file-desc a:hover {
  transition: all 0.1s ease-in;
  color: rgb(43, 133, 228, 0.75);
  font-style: italic;
  text-decoration: underline;
}
</style>