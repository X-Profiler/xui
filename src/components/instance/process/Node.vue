<template>
  <div class="processes">
    <!-- loading -->
    <x-loading :loading="processes_loading" top="40vh" type="dot" size="large"></x-loading>

    <!-- show data -->
    <transition name="slide-noward">
      <div v-show="!processes_loading">
        <x-error-message v-show="processes_load_error" :message="processes_load_error" top="40vh"></x-error-message>
        <x-table
          v-show="!processes_load_error"
          :columns="processColumns"
          :data="processes_data"
          fontSize="14"
          no-data-head
          noDataText="没有在该实例上查找到任何 Node.js 进程"
          stribe
        >
          <template v-slot:command="{ row }">
            <div class="process-command">{{ row.command }}</div>
          </template>

          <template v-slot:options="{ row }">
            <Button type="info" size="small" @click="checkXprofiler(row)">
              <div class="process-check">插件状态</div>
            </Button>
          </template>
        </x-table>
      </div>
    </transition>
  </div>
</template>

<script>
import NodeModule from "@/javascripts/instance/process/Node";

export default {
  data() {
    return {
      processColumns: [
        { title: "PID", value: "pid", width: "90" },
        { title: "进程启动命令", value: "command" },
        { title: "操作", value: "options", width: "110", align: "center" }
      ]
    };
  },

  ...NodeModule
};
</script>

<style scoped>
.processes {
  text-align: center;
}

.process-command {
  word-wrap: break-word;
  word-break: break-all;
}

.process-check {
  font-size: 13px;
}
</style>