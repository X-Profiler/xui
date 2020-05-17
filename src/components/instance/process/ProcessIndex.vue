<template>
  <div>
    <x-loading :loading="xprofiler_processes_loading" top="30vh" size="middle" type="dot"></x-loading>

    <x-error-message
      v-show="globalProcessTip || xprofiler_processes_load_error"
      :message="globalProcessTip || xprofiler_processes_load_error"
      top="calc(30vh -  21px)"
    ></x-error-message>

    <x-node v-if="display && nodeProcesses.length" :processes="nodeProcesses"></x-node>

    <div v-show="display && !nodeProcesses.length" class="content">
      <!-- process panel -->
      <div class="panel">
        <!-- show process panel -->
        <transition name="slide">
          <x-panel
            style="height: 100%"
            ref="panel"
            v-show="display"
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

          <!-- show process line -->
          <transition name="slide-rightward">
            <x-line ref="line" v-show="display" :processes="xProcesses" @selectPid="selectPid"></x-line>
          </transition>
        </div>

        <!-- show process sorted catalogue-->
        <div class="process-catalogue-body">
          <!-- show sorted catalogue -->
          <transition name="slide-rightward">
            <x-catalogue
              ref="catalogue"
              v-show="display"
              :processes="xProcesses"
              @selectPid="selectPid"
            ></x-catalogue>
          </transition>
        </div>

        <!-- show process scatter -->
        <div class="process-chart-body">
          <div class="section-title">指标分布状况</div>

          <!-- show chart -->
          <div style="margin-top: 10px;">
            <x-scatter
              ref="scatter"
              :display="display"
              :processes="xProcesses"
              @selectPid="selectPid"
            ></x-scatter>
          </div>
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
import xNode from "@/components/instance/process/Node";

export default {
  components: {
    "x-line": xLine,
    "x-panel": xPanel,
    "x-catalogue": xCatalogue,
    "x-scatter": xScatter,
    "x-node": xNode
  },

  data() {
    return {
      selectedPid: undefined,
      xProcesses: [],
      nodeProcesses: [],
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