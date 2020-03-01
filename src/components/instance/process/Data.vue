<template>
  <div class="content">
    <!-- process panel -->
    <div class="panel">
      <!-- loading -->
      <div style="text-align: center">
        <x-loading :loading="xProcessesLoading" :top="300" size="small" type="dot"></x-loading>
      </div>

      <!-- show process panel -->
      <transition name="slide">
        <x-panel
          ref="panel"
          v-show="!xProcessesLoading"
          :processes="xProcesses"
          @selectPid="selectPid"
        ></x-panel>
      </transition>
    </div>

    <!-- process data -->
    <div class="data">
      <!-- process line -->
      <div class="process-line-body">
        <div class="process-body-title">{{ lineTitle }}</div>

        <!-- loading -->
        <div style="text-align: center">
          <x-loading :loading="xProcessesLoading" :top="45" size="small" type="dot"></x-loading>
        </div>

        <!-- show process line -->
        <transition name="slide-rightward">
          <x-line
            ref="line"
            v-show="!xProcessesLoading"
            :processes="xProcesses"
            @selectPid="selectPid"
          ></x-line>
        </transition>
      </div>

      <!-- process sorted catalogue-->
      <div class="process-catalogue-body">
        <!-- show sorted catalogue -->
        <transition name="slide-rightward">
          <x-catalogue
            ref="catalogue"
            v-show="!xProcessesLoading"
            :processes="xProcesses"
            @selectPid="selectPid"
          ></x-catalogue>
        </transition>
      </div>

      <!-- process scatter -->
      <div class="process-chart-body">
        <div class="process-body-title">指标分布状况</div>

        <!-- show chart -->
        <div class="process-chart-group">
          <transition name="slide-rightward">
            <x-scatter
              v-show="!xProcessesLoading"
              class="process-scatter"
              :fields="['HEAP', 'CPU']"
              :xAxisUnit="['%', '-3.8em']"
              :yAxisUnit="['%', '0']"
              :data="scatterHeapCpu"
            ></x-scatter>
          </transition>

          <transition name="slide-rightward">
            <x-scatter
              v-show="!xProcessesLoading"
              class="process-scatter"
              :fields="['RSS', 'GC']"
              :xAxisUnit="['MB', '-3.8em']"
              :yAxisUnit="['%', '0']"
              :data="scatterGcRss"
            ></x-scatter>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import processModule from "../../../javascripts/instance/process/Data";

// module
import xLoading from "../../common/Loading";
import xLine from "./Line";
import xPanel from "./Panel";
import xCatalogue from "./Catalogue";
import xScatter from "../../chart/Scatter";

const processData = Object.assign(
  {
    props: {
      appId: Number,
      agentId: String
    },
    components: {
      "x-loading": xLoading,
      "x-line": xLine,
      "x-panel": xPanel,
      "x-catalogue": xCatalogue,
      "x-scatter": xScatter
    },
    data() {
      return {
        selectedPid: undefined,
        xProcesses: [],
        xProcessesLoading: false,
        colors: [
          "rgb(42, 125, 194)",
          "rgb(106, 90, 205)",
          "rgb(41, 145, 65)",
          "rgb(215, 124, 0)",
          "rgb(186, 74, 0)",
          "rgb(46, 134, 193)",
          "rgb(136, 78, 160)",
          "rgb(19, 141, 117)",
          "rgb(34, 153, 84)"
        ],
        nessaryQueryArgs: ["tab", "agentId"]
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
  width: 260px;
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

.process-catalogue-body {
  margin-top: 5px;
  min-height: 40px;
  border-bottom: 1px solid #f8f8f9;
}

.process-chart-body {
  margin-top: 15px;
}

.process-body-title {
  font-weight: bold;
}

.process-chart-group {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.process-scatter {
  min-width: 300px;
  min-height: 300px;
  flex: 1 0 300px;
}
</style>