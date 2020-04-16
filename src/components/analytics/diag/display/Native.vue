<template>
  <div>
    <x-table :columns="columns" :data="nativeStacks" noDataText="暂无 Native 栈信息" no-data-head stribe>
      <!-- pc address -->
      <template v-slot:pcAddress="{ row }">
        <div class="padding">
          <code>{{ row.pcAddress }}</code>
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
import nativeModule from "@/javascripts/analytics/diag/display/Native";

export default {
  data() {
    return {
      columns: [
        { title: "寄存器指令地址", value: "pcAddress", width: 140 },
        {
          title: "Native 函数 / 链接库信息",
          value: "frameDetail"
        }
      ]
    };
  },

  ...nativeModule
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