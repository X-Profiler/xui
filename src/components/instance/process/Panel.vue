<template>
  <div>
    <!-- check running process -->
    <div style="text-align:right">
      <Button class="check-button" type="info" size="small">
        <Icon type="md-apps" class="check-button-icon" />查看运行中的 Node.js 进程
      </Button>
    </div>

    <!-- process panel -->
    <div class="panel">
      <div class="panel-title" :style="panelStyle">
        <div class="panel-title-line">
          <div class="panel-title-pid">PID: {{ processData.pid }}</div>
          <x-dropdown class="panel-title-dropdown" title="进程列表"></x-dropdown>
        </div>
        <div class="panel-title-cmd" :title="processData.cmd">{{ processData.cmd }}</div>
      </div>

      <div class="panel-content">
        <div class="panel-content-metric">
          <div v-for="(metric, index) in metrics" :key="index" class="panel-content-metric-group">
            <div class="panel-content-metric-key">{{ metric.label }}</div>
            <div
              v-if="!metric.time"
              class="panel-content-metric-value"
            >{{ processData[metric.value] }}</div>
            <div v-else class="panel-content-metric-value">
              <p>{{ splitTime(processData[metric.value])[1] }}</p>
              <p>{{ splitTime(processData[metric.value])[0] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xDropdown from "../../common/Dropdown";
import panelModule from "../../../javascripts/instance/process/Panel";

const panelData = Object.assign(
  {
    components: {
      "x-dropdown": xDropdown
    },
    data() {
      return {
        processData: {
          pid: "未知"
        },
        metrics: [
          { label: "启动时间", value: "startTimeFmt", time: true },
          { label: "更新时间", value: "updateTimeFmt", time: true },
          { label: "CPU 使用率", value: "cpuUsageFmt" },
          { label: "堆内存使用率", value: "heapUsageFmt" },
          { label: "GC 占比", value: "gcUsageFmt" },
          { label: "物理内存占用", value: "rssFmt" },
          { label: "UV 活跃句柄", value: "uvHandles" },
          { label: "定时器数量", value: "timers" },
          { label: "TCP 句柄数", value: "tcpHandles" },
          { label: "UDP 句柄数", value: "udpHandles" }
        ]
      };
    }
  },
  panelModule
);

export default panelData;
</script>

<style scoped>
.check-button {
  font-size: 11px;
}

.check-button-icon {
  margin-right: 5px;
}

.panel {
  margin-top: 5px;
}

.panel-title {
  height: 65px;
  background-color: #c5c8ce;
  text-align: left;
  padding: 10px 15px;
  color: #fff;
}

.panel-title-dropdown {
  font-size: 12px;
  width: 70px;
  margin-top: 2px;
}

.panel-title-line {
  display: flex;
}

.panel-title-pid {
  font-size: 17px;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  flex-grow: 1;
}

.panel-title-cmd {
  margin-top: 2px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.panel-content {
  padding: 10px 0;
  background-color: #f9fafc;
}

.panel-content-metric {
  display: flex;
  flex-wrap: wrap;
}

.panel-content-metric-group {
  width: 50%;
  margin-bottom: 15px;
}

.panel-content-metric-key {
  font-size: 12px;
  color: #919597;
}

.panel-content-metric-value {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  margin-top: 3px;
  color: #17233d;
}
</style>