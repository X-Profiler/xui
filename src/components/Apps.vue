<template>
  <div>
    <div v-if="appLoading" class="spin-loading" style="margin-top:200px;">
      <Spin size="large"></Spin>
    </div>
    <div v-else>
      <!-- app overview -->
      <div v-if="apps.length === 0" class="no-apps">{{ noAppTip }}</div>
      <div
        v-for="(app, index) in apps"
        :key="index"
        class="app"
        :style="index === apps.length - 1 ? 'margin-bottom: 80px':''"
      >
        <!-- app border -->
        <div class="app-border" :style="'background-color: ' + randomColor(index)"></div>

        <!-- app content -->
        <div class="app-content">
          <!-- title -->
          <!-- :style="'border-right: 1px dashed ' + randomColor(index) + ';border-bottom: 1px dashed ' + randomColor(index)" -->
          <div class="app-content-title">
            <div class="app-content-title-name" :style="'background-color: ' + randomColor(index)">
              <p>{{ app.name }}</p>
              <div style="display: flex">
                <div
                  v-for="(func, index) in functions"
                  :key="index"
                  class="app-content-select"
                  :style="'margin-top: 1px;' + (index !== 0 ? 'margin-left: 10px;':'')"
                >
                  <div v-if="!func.disabled || func.disabled !== type">
                    <p style="font-size: 10px">{{ func.label }}</p>
                    <Icon :type="func.icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="app-content-title-metric">
              <div v-for="(metric, index) in metrics" :key="index">
                <p class="app-content-title-metric-key">{{ metric.label }}</p>
                <!-- loading -->
                <div v-if="app[`${metric.value}Loading`]" class="spin-loading">
                  <Spin size="small"></Spin>
                </div>

                <!-- show data -->
                <p
                  v-else
                  class="app-content-title-metric-value app-content-select"
                >{{ formatCount(app[metric.value]) }}</p>
              </div>
            </div>
          </div>

          <!-- metrics -->
          <div class="app-content-metrics">
            <div style="display: flex;height: 100%;padding-bottom: 10px;">
              <!-- node process cpu -->
              <div v-for="(metric, index) in mainMetrics" :key="index" class="app-content-metric">
                <div>{{ metric.label }}</div>
                <!-- loading -->
                <div
                  v-if="app[`${metric.value}Loading`]"
                  class="spin-loading"
                  style="margin-top: 15px;"
                >
                  <Spin size="small"></Spin>
                </div>

                <!-- no data -->
                <div v-else-if="app[metric.value].length === 0" class="no-data">-</div>

                <!-- show data -->
                <div v-else>
                  <div class="instances">
                    <Icon
                      v-for="(instance, index) in app[metric.value]"
                      :key="index"
                      class="instance-ico"
                      type="md-egg"
                      :style="getInstanceStyle(instance)"
                      :title="instance.title"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appsModule from "../javascripts/Apps";

const appsData = Object.assign(
  {
    props: {
      type: String
    },
    data() {
      return {
        colors: [
          "#2d8cf0",
          "#2db7f5",
          "#19be6b",
          "#5cadff",
          "#ff9900",
          "#2b85e4",
          "#ed4014",
          "#c5c8ce"
        ],
        functions: [
          { label: "实例", icon: "md-albums" },
          { label: "文件", icon: "ios-folder" },
          { label: "团队", icon: "md-people" },
          { label: "告警", icon: "ios-alarm" },
          { label: "设置", icon: "md-settings", disabled: "joinedApps" }
        ],
        metrics: [
          { label: "实例个数", value: "instanceCount" },
          { label: "24h 告警数", value: "alarmCount" },
          { label: "依赖风险数", value: "riskCount" }
        ],
        mainMetrics: [
          { label: "Node.js 进程 CPU 负载", value: "processCpuUsage" },
          { label: "Node.js 进程堆内存状态", value: "processMemoryUsage" },
          { label: "系统整体 CPU 负载", value: "systemCpuUsage" },
          { label: "系统整体可用内存状态", value: "systemMemoryUsage" },
          { label: "系统磁盘状态", value: "diskUsage" }
        ],
        appLoading: false,
        apps: []
      };
    }
  },
  appsModule
);

export default appsData;
</script>

<style scoped>
.app {
  text-align: left;
  margin-bottom: 20px;
  background-color: #fafbfd;
  display: flex;
  flex-basis: 7px;
}

.no-apps {
  margin-top: 200px;
}

.app-border {
  min-width: 7px;
  flex-basis: 7px;
  /* height: 100%; */
  background-image: url("/images/bg1.jpg");
  background-blend-mode: multiply;
}

.app-content {
  /* height: 100%; */
  flex-grow: 1;
  display: flex;
}

.app-content-title {
  height: 100%;
  width: 25%;
  background-color: #f8f8f9;
}

.app-content-title-name {
  font-size: 20px;
  padding: 10px 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
  background-image: url("/images/bg1.jpg");
  background-blend-mode: multiply;
}

.app-content-select {
  cursor: pointer;
}

.app-content-title-metric {
  display: flex;
  font-size: 10px;
  text-align: center;
  margin-left: 5px;
}

.app-content-title-metric-key {
  margin: 5px 10px;
  /* font-weight: bold; */
}

.app-content-title-metric-value {
  margin: 5px 10px;
  font-weight: bold;
}

.app-content-metrics {
  height: 100%;
  padding-top: 15px;
  width: 75%;
}

.app-content-metric {
  width: 20%;
  padding: 0 10px;
  text-align: center;
}

.instances {
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: center;
  padding-top: 10px;
  /* height: 100%; */
}

.instance-ico {
  font-size: 18px;
  padding: 2px;
  cursor: pointer;
}

.no-data {
  padding-top: 20px;
  font-weight: bold;
  font-size: 15px;
}
</style>