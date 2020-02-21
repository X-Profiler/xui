<template>
  <div class="content">
    <!-- process panel -->
    <div class="panel"></div>

    <!-- process data -->
    <div class="data">
      <!-- process line -->
      <div class="process-line-body">
        <div class="process-line-title">进程存活时间线</div>

        <!-- loading -->
        <div style="text-align: center">
          <x-loading :loading="xProcessesLoading" :top="45" size="small" type="dot"></x-loading>
        </div>

        <!-- show process line -->
        <transition name="slide-noward">
          <x-line
            ref="line"
            v-show="!xProcessesLoading"
            :processes="xProcesses"
            @selectPid="selectPid"
          ></x-line>
        </transition>
      </div>
    </div>

    <!-- tooltip -->
    <x-tooltip>
      <template slot="header">
        <!-- header -->
        <div
          class="tooltip-header"
          :style="'background-color: ' + (activeXProcess ? activeXProcess.color :'#f8f8f9')"
        >
          <div>PID: {{ activeXProcess.pid }}</div>
        </div>
      </template>

      <template slot="content">
        <div class="tooltip-content">
          <div v-for="(cont, index) in tooltipContent" :key="index" class="tooltip-content-group">
            <div class="tooltip-content-group-key">{{ cont.key }}:</div>
            <div class="tooltip-content-group-value">{{ activeXProcess[cont.value] }}</div>
          </div>
        </div>
      </template>
    </x-tooltip>
  </div>
</template>

<script>
import xLoading from "../../common/Loading";
import xTooltip from "../../common/Tooltip";
import processModule from "../../../javascripts/instance/process/Data";

// module
import xLine from "./Line";

const processData = Object.assign(
  {
    props: {
      appId: Number,
      agentId: String
    },
    components: {
      "x-loading": xLoading,
      "x-tooltip": xTooltip,
      "x-line": xLine
    },
    data() {
      return {
        selectedPid: undefined,
        xProcesses: [],
        xProcessesLoading: false,
        tooltipContent: [
          { key: "启动命令", value: "cmd" },
          { key: "创建时间", value: "startTime" },
          { key: "更新时间", value: "updateTime" }
        ]
      };
    }
  },
  processModule
);

export default processData;
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row-reverse;
}

.panel {
  width: 200px;
  background-color: #f8f8f9;
}

.data {
  text-align: left;
  flex-grow: 1;
  padding-right: 10px;
}

.process-line-body {
  min-height: 150px;
  border-bottom: 1px solid #f8f8f9;
}

.process-line-title {
  font-weight: bold;
  /* font-size: 15px; */
}

.tooltip-header {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  height: 25px;
  color: white;
  text-align: left;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.tooltip-content {
  text-align: left;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.tooltip-content-group {
  display: flex;
  padding: 1px 0;
}

.tooltip-content-group-key {
  font-size: 12px;
  font-weight: bold;
  width: 100px;
}

.tooltip-content-group-value {
  font-size: 12px;
  flex-grow: 1;
}
</style>