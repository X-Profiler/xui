<template>
  <div>
    <!-- loading -->
    <div v-show="appLoading" class="spin-loading" style="margin-top:200px;">
      <Spin size="large"></Spin>
    </div>

    <!-- app list -->
    <transition name="slide">
      <div v-show="!appLoading">
        <!-- app overview -->
        <div v-if="apps.length === 0" class="no-apps">{{ noAppTip }}</div>
        <div
          v-for="(app, index) in apps"
          :key="index"
          class="app"
          :style="index === apps.length - 1 ? 'margin-bottom: 80px':''"
        >
          <!-- app border -->
          <div
            class="app-border background-image-china-style"
            :style="'background-color: ' + randomColor(index)"
          ></div>

          <!-- app content -->
          <div class="app-content">
            <!-- title -->
            <!-- :style="'border-right: 1px dashed ' + randomColor(index) + ';border-bottom: 1px dashed ' + randomColor(index)" -->
            <div class="app-content-title">
              <div
                class="app-content-title-name background-image-china-style"
                :style="'background-color: ' + randomColor(index)"
              >
                <p>{{ app.name }}</p>
                <div style="display: flex">
                  <div
                    v-for="(func, index) in functions"
                    :key="index"
                    class="app-title-content-metric"
                    :style="(index !== 0 ? 'margin-left: 10px;':'')"
                  >
                    <div v-if="!func.disabled || func.disabled !== type">
                      <p style="font-size: 11px">{{ func.label }}</p>
                      <Icon
                        class="app-content-select"
                        :type="func.icon"
                        @click="goToFunction(app.appId, func.value)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="app-content-title-metric">
                <div v-for="(metric, index) in metrics" :key="index">
                  <p class="app-content-title-metric-key">{{ metric.label }}</p>
                  <!-- loading -->
                  <div v-show="app[`${metric.value}Loading`]" class="spin-loading">
                    <Spin size="small"></Spin>
                  </div>

                  <!-- show data -->
                  <transition name="slide-down">
                    <p
                      v-show="!app[`${metric.value}Loading`]"
                      class="app-content-title-metric-value app-content-select"
                      @click="goToFunction2(app.appId, metric.value)"
                    >{{ formatCount(app[metric.value]) }}</p>
                  </transition>
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
                    v-show="app[`${metric.value}Loading`]"
                    class="spin-loading"
                    style="margin-top: 15px;"
                  >
                    <Spin size="small"></Spin>
                  </div>

                  <!-- no data -->
                  <div
                    v-show="!app[`${metric.value}Loading`] && app[metric.value].length === 0"
                    class="no-data"
                  >-</div>

                  <!-- show data -->
                  <div v-show="!app[`${metric.value}Loading`] && app[metric.value].length !== 0">
                    <div class="instances">
                      <Icon
                        v-for="(instance, index) in app[metric.value]"
                        :key="index"
                        class="instance-ico"
                        type="md-egg"
                        :style="getInstanceStyle(instance)"
                        :title="instance.title"
                        @click="goToAgent(app.appId, metric.value, instance.agentId, instance.pid)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import appsModule from "../javascripts/Apps";
import { tags } from "../javascripts/lib/Config";
import { getTag } from "../javascripts/lib/Utils";

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
          {
            label: getTag(tags.instance),
            value: "instance",
            icon: "md-cloud"
          },
          { label: getTag(tags.file), value: "file", icon: "md-folder" },
          { label: getTag(tags.team), value: "team", icon: "md-people" },
          { label: getTag(tags.alarm), value: "alarm", icon: "ios-alarm" },
          {
            label: getTag(tags.settings),
            value: "setting",
            icon: "md-settings",
            disabled: "joinedApps"
          }
        ],
        metrics: [
          { label: getTag(tags.instanceCount), value: "instanceCount" },
          { label: getTag(tags.rsikCount), value: "riskCount" },
          { label: getTag(tags.alarmCount), value: "alarmCount" }
        ],
        mainMetrics: [
          { label: getTag(tags.processCpuUsage), value: "processCpuUsage" },
          {
            label: getTag(tags.processMemoryUsage),
            value: "processMemoryUsage"
          },
          { label: getTag(tags.systemCpuUsage), value: "systemCpuUsage" },
          { label: getTag(tags.systemMemoryUsage), value: "systemMemoryUsage" },
          { label: getTag(tags.diskUsage), value: "diskUsage" }
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
}

.app-content {
  /* height: 100%; */
  flex-grow: 1;
  display: flex;
}

.app-title-content-metric {
  min-width: 30px;
  margin-top: 1px;
  text-align: center;
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
}

.app-content-select {
  cursor: pointer;
}

.app-content-title-metric {
  display: flex;
  font-size: 11px;
  text-align: center;
  margin-left: 5px;
  height: 51px;
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