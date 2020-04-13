<template>
  <div class="content">
    <!-- process panel -->
    <div class="panel">
      <!-- loading -->
      <div style="text-align: center">
        <x-loading :loading="xprofiler_processes_loading" top="40vh" size="middle" type="dot"></x-loading>
      </div>

      <x-error-message
        v-if="xprofiler_processes_load_error"
        :message="xprofiler_processes_load_error"
        top="calc(40vh - 22px)"
      ></x-error-message>

      <!-- show process panel -->
      <transition name="slide">
        <x-panel
          style="height: 100%"
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
        <div class="section-title">{{ lineTitle }}</div>

        <!-- loading -->
        <div style="text-align: center">
          <x-loading :loading="xprofiler_processes_loading" :top="55" size="middle" type="dot"></x-loading>
        </div>

        <x-error-message
          v-if="xprofiler_processes_load_error"
          :message="xprofiler_processes_load_error"
          top="30"
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
        <div class="section-title">指标分布状况</div>

        <!-- loading -->
        <div style="text-align: center">
          <x-loading :loading="xprofiler_processes_loading" top="calc(50vh - 175px)" size="middle" type="dot"></x-loading>
        </div>

        <x-error-message
          v-if="xprofiler_processes_load_error"
          :message="xprofiler_processes_load_error"
          top="calc(50vh - 197px)"
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
import processModule from "@/javascripts/instance/process/ProcessIndex";

// module
import xLine from "@/components/instance/process/Line";
import xPanel from "@/components/instance/process/Panel";
import xCatalogue from "@/components/instance/process/Catalogue";
import xScatter from "@/components/instance/process/Scatter";

export default {
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
  },

  ...processModule
};
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
</style>