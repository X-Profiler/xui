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
          <x-loading :loading="xProcessesLoading" :top="45" size="middle"></x-loading>
        </div>

        <!-- show process line -->
        <transition name="slide-noward">
          <div v-show="!xProcessesLoading">
            <div class="process-line-group">
              <div class="process-line"></div>
              <div class="process-line"></div>
              <div class="process-line"></div>
              <div class="process-line"></div>
              <div class="process-line"></div>
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
  </div>
</template>

<script>
import xLoading from "../common/Loading";
import processModule from "../../javascripts/instance/ProcessData";

const processData = Object.assign(
  {
    props: {
      appId: Number,
      agentId: String
    },
    components: {
      "x-loading": xLoading
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
  background-color: #f8f8f9;
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