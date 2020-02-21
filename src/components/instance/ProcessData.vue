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
          <div v-show="!xProcessesLoading">
            <div class="process-line-group">
              <div
                v-for="(xProcess, index) in xProcesses"
                :key="index"
                style="background-color: #e8eaec;width: 100%"
              >
                <div
                  class="process-line"
                  :style="getProcessLineStyle(index) + xProcess.selectedStyle"
                  @click="selectPid(index)"
                ></div>
              </div>
            </div>
            <div class="process-line-label-group">
              <div v-for="(time, index) in times" :key="index" class="process-line-label">
                <div>{{ time.value }}</div>
                <div>{{ time.label }}</div>
              </div>
            </div>
          </div>
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
import xLoading from "../common/Loading";
import xTooltip from "../common/Tooltip";
import processModule from "../../javascripts/instance/ProcessData";

const processData = Object.assign(
  {
    props: {
      appId: Number,
      agentId: String
    },
    components: {
      "x-loading": xLoading,
      "x-tooltip": xTooltip
    },
    data() {
      return {
        selectedPid: undefined,
        xProcesses: [],
        xProcessesLoading: false,
        times: [],
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

.process-line-group {
  margin: 10px 0;
}

.process-line {
  height: 5px;
  margin-top: 10px;
}

.process-line:hover {
  -webkit-transform: scaleY(1.3);
  transform: scaleY(1.3);
  /* box-shadow: 0 0 0 2px rgb(248, 152, 0, 0.4); */
}

.process-line-label-group {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 5px;
  justify-content: space-between;
}

.process-line-label {
  text-align: center;
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