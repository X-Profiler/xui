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
  </div>
</template>

<script>
import xLoading from "../../common/Loading";
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
      "x-line": xLine
    },
    data() {
      return {
        selectedPid: undefined,
        xProcesses: [],
        xProcessesLoading: false,
        colors: [
          "rgb(42, 125, 194)",
          "rgb(41, 145, 65)",
          "rgb(55, 189, 94)",
          "rgb(47, 149, 176)",
          "rgb(57, 175, 209)",
          "rgb(215, 124, 0)",
          "rgb(248, 152, 0)",
          "rgb(137, 130, 113)",
          "rgb(169, 159, 141)"
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
}
</style>