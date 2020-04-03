<template>
  <div v-show="!files_loading && !files_load_error">
    <x-table :columns="columns" :data="files" noDataText="项目下暂无性能文件" no-data-head>
      <!-- file type -->
      <template v-slot:fileType="{ row }">
        <x-type :row="row"></x-type>
      </template>
    </x-table>

    <div v-if="totaFileCount" class="pagination">
      <Page
        :total="totaFileCount"
        :page-size="pageSize"
        :current="currentPage"
        size="small"
        show-elevator
        @on-change="changeFilePage"
      />
    </div>
  </div>
</template>

<script>
import xContent from "@/javascripts/file/list/Content";
import xType from "@/components/file/list/Type";

export default {
  components: {
    "x-type": xType
  },

  data() {
    return {
      currentPage: undefined,
      pageSize: 10,
      columns: [
        {
          title: "文件类型",
          value: "fileType",
          align: "center",
          width: "125px"
        },
        { title: "文件信息", value: "fileInfo" },
        { title: "可执行操作", value: "operation" },
        { title: "删除", value: "delete" }
      ],
      totaFileCount: 0
    };
  },
  ...xContent
};
</script>

<style scoped>
.pagination {
  margin-top: 15px;
  text-align: right;
}
</style>