<template>
  <div>
    <!-- check running process -->
    <div style="text-align:right">
      <Button class="check-button" type="info" size="small" @click="openDrawer()">
        <Icon type="md-apps" class="check-button-icon" />
        {{ checkProcessesTag }}
      </Button>
    </div>

    <!-- process panel -->
    <div class="panel">
      <div class="panel-title" :style="panelStyle">
        <div class="panel-title-line">
          <div class="panel-title-pid">PID: {{ processData.pid }}</div>
          <x-dropdown class="panel-title-dropdown" :title="processListTag">
            <template slot="content">
              <div
                :class="'x-dropdown-li' + (proc.pid === processData.pid ? ' selected':'')"
                v-for="(proc, index) in processes"
                :key="index"
                @click="selectPid(index)"
              >
                <div class="panel-title-dropdown-dot" :style="'background-color: '+ proc.color"></div>
                <div class="panel-title-dropdown-pid">{{ proc.pid }}</div>
                <div class="panel-title-dropdown-cmd" :title="proc.cmd">{{ proc.cmd }}</div>
              </div>
            </template>
          </x-dropdown>
        </div>
        <div class="panel-title-cmd" :title="processData.cmd">{{ processData.cmd }}</div>
      </div>

      <div class="panel-content">
        <!-- panel metrics -->
        <div class="panel-content-metric">
          <div v-for="(metric, index) in metrics" :key="index" class="panel-content-metric-group">
            <div class="panel-content-metric-key">{{ metric.label }}</div>
            <div
              v-if="!metric.time"
              class="panel-content-metric-value"
            >{{ processData[metric.value] || '-' }}</div>
            <div v-else class="panel-content-metric-value">
              <p>{{ splitTime(processData[metric.value])[1] || '-' }}</p>
              <p>{{ splitTime(processData[metric.value])[0] }}</p>
            </div>
          </div>

          <!-- process detail -->
          <div class="panel-chapter">{{ processDetailTag }}</div>
          <div class="panel-long-button">
            <Button size="small" type="primary" ghost long @click="checkXprofiler">
              <div class="panel-button-value">{{ checkXprofilerTag }}</div>
            </Button>
          </div>
          <div class="panel-button">
            <div class="panel-normal-button" v-for="(button, index) in detailButtons" :key="index">
              <Button size="small" type="info" long @click="actDetail(button.value)">
                <div class="panel-button-value">{{ button.label }}</div>
              </Button>
            </div>
          </div>

          <!-- process actions -->
          <div class="panel-chapter">{{ actionsTag }}</div>
          <div class="panel-button">
            <div
              class="panel-normal-button"
              v-for="(button, index) in actionButtons"
              :key="index"
              :style="index === actionButtons.length - 1 && index % 2 === 0 ? 'width: 100%':''"
            >
              <Button size="small" type="info" long>
                <div class="panel-button-value">{{ button.label }}</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- check xprofiler status -->
    <x-check-xprofiler></x-check-xprofiler>

    <!-- save processes trend dara -->
    <x-modal
      ref="saveTrend"
      title="保存数据趋势"
      :padding="0"
      :width="500"
      hide-footer
      @canceled="closeSaveTrendModal"
    >
      <x-save-trend slot="content"></x-save-trend>
    </x-modal>

    <!-- show process details -->
    <x-drawer ref="trend" @close="closeTrendDrawer()">
      <template slot="header">
        <div class="processes-header">进程 {{ processTrendData.pid }} 数据趋势</div>
      </template>

      <template slot="content">
        <div class="trend-content">
          <x-trend></x-trend>
        </div>
      </template>
    </x-drawer>

    <!-- show all processes -->
    <x-drawer ref="processes" @close="closeDrawer()">
      <template slot="header">
        <div
          class="processes-header"
        >实例 {{ agentId }} 存在以下 {{ processCount }} 个 Node.js 进程（不一定接入 Xprofiler 插件）</div>
      </template>

      <template slot="content">
        <div class="process-content">
          <x-node></x-node>
        </div>
      </template>
    </x-drawer>
  </div>
</template>

<script>
import panelModule from "../../../javascripts/instance/process/Panel";
import { tags } from "../../../javascripts/config";
import { getTag } from "../../../javascripts/lib/utils";
import xNode from "./Node";
import xCheckXprofiler from "./CheckXprofiler";
import xTrend from "./Trend";
import xSaveTrend from "./SaveTrend";

const panelData = Object.assign(
  {
    props: {
      processes: Array
    },

    components: {
      "x-node": xNode,
      "x-check-xprofiler": xCheckXprofiler,
      "x-trend": xTrend,
      "x-save-trend": xSaveTrend
    },

    data() {
      return {
        processData: {
          pid: "未知"
        },
        metrics: [
          { label: getTag(tags.startTime), value: "startTimeFmt", time: true },
          {
            label: getTag(tags.updateTime),
            value: "updateTimeFmt",
            time: true
          },
          { label: getTag(tags.cpuUsage), value: "cpuUsageFmt" },
          { label: getTag(tags.heapMemory), value: "heapUsageFmt" },
          { label: getTag(tags.gcUsage), value: "gcUsageFmt" },
          { label: getTag(tags.rssUsage), value: "rssFmt" },
          { label: getTag(tags.uvHandles), value: "uvHandles" },
          { label: getTag(tags.timers), value: "timers" },
          { label: getTag(tags.tcpHandles), value: "tcpHandles" },
          { label: getTag(tags.udpHandles), value: "udpHandles" }
        ],
        detailButtons: [
          { label: getTag(tags.processDataTrend), value: "processTrend" },
          { label: getTag(tags.saveProcessData), value: "saveProcessData" }
        ],
        actionButtons: [
          { label: getTag(tags.cpuprofile), value: "cpuprofile" },
          { label: getTag(tags.heapsnapshot), value: "heapsnapshot" },
          { label: getTag(tags.heapprofile), value: "heapprofile" },
          { label: getTag(tags.gcprofile), value: "gcprofile" },
          { label: getTag(tags.diag), value: "diag" }
        ],
        drawerQueryKey: "process-trend",
        drawerQueryKeyProcesses: "show-processes",
        modalQueryKeySaveTrend: "save-trend-data"
      };
    }
  },
  panelModule
);

export default panelData;
</script>

<style scoped>
.check-button {
  font-size: 13px;
}

.check-button-icon {
  margin-right: 2px;
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
  font-size: 13px;
  width: 70px;
  margin-top: 2px;
}

.panel-title-dropdown-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.panel-title-dropdown-pid {
  margin-left: 12px;
  font-weight: bold;
  width: 60px;
}

.panel-title-dropdown-cmd {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  margin-top: 1px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 230px;
}

.panel-content {
  padding: 10px 0;
  background-color: #f9fafc;
}

.panel-chapter {
  margin-left: 15px;
  font-family: PingFangSC-Regular, "Titillium Web", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 15px;
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
  color: #373d41;
}

.panel-normal-button {
  width: 50%;
  margin-bottom: 15px;
  width: 105px;
}

.panel-long-button {
  width: 100%;
  margin-bottom: 15px;
  padding: 0 15px;
}

.panel-button {
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.panel-button-value {
  font-size: 13px;
}

.processes-header {
  font-weight: bold;
  padding: 20px 20px 10px 20px;
}

.process-content {
  padding: 10px 20px 20px 20px;
}

.trend-content {
  padding: 0 20px 20px 20px;
}
</style>