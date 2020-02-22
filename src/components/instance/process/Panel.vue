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
        <div class="panel-title-pid">PID: {{ processData.pid }}</div>
        <div class="panel-title-cmd" :title="processData.cmd">{{ processData.cmd }}</div>
      </div>

      <div class="panel-content">
        <div class="panel-content-metric">
          <div v-for="(metric, index) in metrics" :key="index" class="panel-content-metric-group">
            <div>{{ metric.label }}</div>
            <div v-if="!metric.time">{{ processData[metric.value] }}</div>
            <div v-else>
              <p>{{ splitTime(processData[metric.value])[0] }}</p>
              <p>{{ splitTime(processData[metric.value])[1] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panelModule from "../../../javascripts/instance/process/Panel";

const panelData = Object.assign(
  {
    data() {
      return {
        processData: {
          pid: "未知"
        },

        metrics: [
          { label: "启动时间", value: "startTimeFormat", time: true },
          { label: "更新时间", value: "updateTimeFormat", time: true }
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

.panel-title-pid {
  font-size: 17px;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.panel-title-cmd {
  margin-top: 3px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.panel-content {
  background-color: #f9fafc;
}

.panel-content-metric {
  display: flex;
}

.panel-content-metric-group {
  width: 50%;
}
</style>