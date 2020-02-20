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
                v-for="(xProcesse, index) in xProcesses"
                :key="index"
                style="background-color: #e8eaec;width: 100%"
              >
                <div class="process-line" :style="getProcessLineStyle(index)"></div>
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
        <div style="height:20px;background-color: blue"></div>
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
        times: []
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

.process-line-label-group {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 5px;
  justify-content: space-between;
}

.process-line-label {
  text-align: center;
}
</style>