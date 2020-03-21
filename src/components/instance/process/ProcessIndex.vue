<template>
  <div class="content">
    <!-- process panel -->
    <div class="panel">
      <!-- loading -->
      <div style="text-align: center">
        <x-loading :loading="xprofiler_processes_loading" :top="300" size="small" type="dot"></x-loading>
      </div>

      <x-error-message
        v-if="xprofiler_processes_load_error"
        :message="xprofiler_processes_load_error"
        top="calc(35vh - 50px)"
      ></x-error-message>

      <!-- show process panel -->
      <transition name="slide">
        <x-panel
          ref="panel"
          v-show="!xprofiler_processes_loading && !xprofiler_processes_load_error"
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
          <x-loading :loading="xprofiler_processes_loading" :top="45" size="small" type="dot"></x-loading>
        </div>

        <x-error-message
          v-if="xprofiler_processes_load_error"
          :message="xprofiler_processes_load_error"
          top="25"
        ></x-error-message>

        <!-- show process line -->
        <transition name="slide-rightward">
          <x-line
            ref="line"
            v-show="!xprofiler_processes_loading && !xprofiler_processes_load_error"
            :processes="xProcesses"
            @selectPid="selectPid"
          ></x-line>
        </transition>
      </div>

      <!-- show process sorted catalogue-->
      <div class="process-catalogue-body">
        <!-- show sorted catalogue -->
        <transition name="slide-rightward">
          <x-catalogue
            ref="catalogue"
            v-show="!xprofiler_processes_loading && !xprofiler_processes_load_error"
            :processes="xProcesses"
            @selectPid="selectPid"
          ></x-catalogue>
        </transition>
      </div>

      <!-- show process scatter -->
      <div class="process-chart-body">
        <div class="process-body-title">指标分布状况</div>

        <!-- loading -->
        <div style="text-align: center">
          <x-loading :loading="xprofiler_processes_loading" :top="150" size="small" type="dot"></x-loading>
        </div>

        <x-error-message
          v-if="xprofiler_processes_load_error"
          :message="xprofiler_processes_load_error"
          top="200"
        ></x-error-message>

        <!-- show chart -->
        <div style="margin-top: 10px;">
          <x-scatter
            ref="scatter"
            :display="!xprofiler_processes_loading && !xprofiler_processes_load_error"
            :processes="xProcesses"
            @selectPid="selectPid"
          ></x-scatter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import processModule from "../../../javascripts/instance/process/ProcessIndex";

// module
import xLine from "./Line";
import xPanel from "./Panel";
import xCatalogue from "./Catalogue";
import xScatter from "./Scatter";

const processData = Object.assign(
  {
    components: {
      "x-line": xLine,
      "x-panel": xPanel,
      "x-catalogue": xCatalogue,
      "x-scatter": xScatter
    },

    data() {
      return {
        selectedPid: undefined,
        xProcesses: [],
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
</style>