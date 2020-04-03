<template>
  <div>
    <x-table :columns="columns" :data="files" noDataText="项目下暂无性能文件" no-data-head>
      <template v-slot:fileType="{ row }">
        {{ row.typeLabel }}
      </template>
    </x-table>
  </div>
</template>

<script>
import xContent from "@/javascripts/file/list/Content";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      columns: [
        { title: "文件类型", value: "fileType" },
        { title: "文件信息", value: "fileInfo" },
        { title: "可执行操作", value: "operation" },
        { title: "删除", value: "delete" }
      ]
    };
  },
  ...xContent
};
</script>