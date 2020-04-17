<template>
  <div>
    <transition name="slide-noward">
      <x-table
        v-if="showHandles.length"
        :columns="columns"
        :data="showHandles"
        :noDataText="`${uvType} 类型下暂无 Libuv 句柄信息`"
        no-data-head
        stribe
      >
        <!-- pc address -->
        <template v-slot:pcAddress="{ row }">
          <div class="padding">
            <code>{{ row.pcAddress }}</code>
          </div>
        </template>

        <!-- active status -->
        <template v-slot:isActive="{ row }">
          <div class="padding">
            <Icon v-if="row.isActive" class="active" type="md-checkmark" />
            <Icon v-else class="inactive" type="md-close" />
          </div>
        </template>

        <!-- ref status -->
        <template v-slot:hasRef="{ row }">
          <div class="padding">
            <Icon v-if="row.hasRef" class="active" type="md-checkmark" />
            <Icon v-else class="inactive" type="md-close" />
          </div>
        </template>

        <!-- extra message -->
        <template v-slot:handleDetail="{ row }">
          <div class="padding">
            <code>{{ row.handleDetail }}</code>
          </div>
        </template>
      </x-table>
    </transition>

    <div v-if="handles.length" class="pagination">
      <Page
        :total="handles.length"
        :page-size="pageSize"
        :current="currentPage"
        size="small"
        show-elevator
        @on-change="changeHandlePage"
      />
    </div>
  </div>
</template>

<script>
import handleModule from "@/javascripts/analytics/diag/display/Handles";

export default {
  data() {
    return {
      currentPage: undefined,
      pageSize: 15,
      columns: [
        { title: "寄存器指令地址", value: "pcAddress", width: 140 },
        { title: "活跃状态", value: "isActive", width: 135, align: "center" },
        { title: "引用状态", value: "hasRef", width: 135, align: "center" },
        { title: "句柄补充信息", value: "handleDetail" }
      ],
      nessaryQueryArgs: [
        "filterType",
        "page",
        "diag-analytics",
        "diagTab",
        "diagData",
        "uvType"
      ]
    };
  },

  ...handleModule
};
</script>

<style scoped>
.padding {
  padding: 4px 0;
}

.active {
  color: #2a9446;
  transform: scale(1.2);
  font-weight: bold;
}

.inactive {
  color: #c45a65;
  transform: scale(1.2);
  font-weight: bold;
}
</style>