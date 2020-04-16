<template>
  <div>
    <!-- heap statistics -->
    <div class="section-title">进程堆信息</div>
    <x-heap></x-heap>

    <!-- javascripts stacks -->
    <div class="section-title" style="margin-top: 25px;">函数调用栈</div>
    <x-table
      style="margin-top: 15px;"
      :columns="columns"
      :data="jsStacks"
      noDataText="暂无 JavaScript 栈信息"
      no-data-head
      stribe
    >
      <!-- pc address -->
      <template v-slot:pcAddress="{ row }">
        <div class="padding">
          <code>{{ row.pcAddress }}</code>
        </div>
      </template>

      <!-- frame type -->
      <template v-slot:frameType="{ row }">
        <div class="padding">
          <code>{{ row.frameType }}</code>
        </div>
      </template>

      <!-- frame detail -->
      <template v-slot:frameDetail="{ row }">
        <div class="padding frame-detail">
          <code>{{ row.frameDetail }}</code>
        </div>
      </template>
    </x-table>
  </div>
</template>

<script>
import javascriptModule from "@/javascripts/analytics/diag/display/JavaScript";
import xHeap from "./Heap";

export default {
  components: {
    "x-heap": xHeap
  },

  data() {
    return {
      columns: [
        {
          title: "寄存器指令地址",
          value: "pcAddress",
          width: 140
        },
        {
          title: "函数类型",
          value: "frameType",
          width: 135,
          align: "center"
        },
        {
          title: "执行栈帧",
          value: "frameDetail"
        }
      ]
    };
  },

  ...javascriptModule
};
</script>

<style scoped>
.padding {
  padding: 4px 0;
}

.frame-detail {
  word-wrap: break-word;
  word-break: break-all;
}
</style>