<template>
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

    <!-- content -->
    <template slot="content">
      <div class="tooltip-content">
        <div v-for="(cont, index) in tooltipContent" :key="index" class="tooltip-content-group">
          <div class="tooltip-content-group-key">{{ cont.key }}:</div>
          <div class="tooltip-content-group-value">{{ activeXProcess[cont.value] }}</div>
        </div>
      </div>
    </template>
  </x-tooltip>
</template>

<script>
import xTooltip from "../../common/Tooltip";
import tipModule from "../../../javascripts/instance/process/Tip";

const tipData = Object.assign(
  {
    props: {
      processData: Object
    },
    components: {
      "x-tooltip": xTooltip
    },
    data() {
      return {
        tooltipContent: [
          { key: "启动命令", value: "cmd" },
          { key: "创建时间", value: "startTime" },
          { key: "更新时间", value: "updateTime" }
        ]
      };
    }
  },
  tipModule
);

export default tipData;
</script>

<style scoped>
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