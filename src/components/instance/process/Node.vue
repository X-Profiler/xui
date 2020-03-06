<template>
  <div class="processes">
    <x-loading :loading="processesLoading" top="40vh" type="dot" size="large"></x-loading>
    <div v-show="!processesLoading">
      <x-error-message v-show="processesLoadError" :message="processesLoadError" top="40vh"></x-error-message>
      <x-table
        v-show="!processesLoadError"
        :columns="processColumns"
        :data="processes"
        noDataText="没有在该实例上查找到任何 Node.js 进程"
        stribe
      ></x-table>
    </div>
  </div>
</template>

<script>
import NodeModule from "../../../javascripts/instance/process/Node";

const NodeData = Object.assign(
  {
    data() {
      return {
        processColumns: [
          { title: "PID", value: "pid", width: "90" },
          { title: "进程启动命令", value: "command" }
        ]
      };
    }
  },
  NodeModule
);

export default NodeData;
</script>

<style scoped>
.processes {
  text-align: center;
}
</style>