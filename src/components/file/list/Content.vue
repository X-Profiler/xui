<template>
  <div v-show="!files_loading && !files_load_error">
    <x-table :columns="columns" :data="files" noDataText="项目下暂无性能文件" no-data-head>
      <!-- file type -->
      <template v-slot:fileType="{ row }">
        <x-type :row="row"></x-type>
      </template>

      <!-- file info -->
      <template v-slot:fileInfo="{ row }">
        <x-info :row="row"></x-info>
      </template>

      <!-- operation -->
      <template v-slot:operation="{ row }">
        <x-operation :row="row"></x-operation>
      </template>

      <!-- deletion -->
      <template v-slot:deletion="{ row }">
        <x-deletion :row="row"></x-deletion>
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
import xInfo from "@/components/file/list/Info";
import xOperation from "@/components/file/list/Operation";
import xDeletion from "@/components/file/list/Deletion";

export default {
  components: {
    "x-type": xType,
    "x-info": xInfo,
    "x-operation": xOperation,
    "x-deletion": xDeletion
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
          width: 125
        },
        { title: "文件信息", value: "fileInfo", left: "20", width: 450 },
        { title: "操作", value: "operation" },
        { title: "删除", value: "deletion", align: "center", width: 200 }
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