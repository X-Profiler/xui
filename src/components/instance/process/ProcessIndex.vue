<template>
  <div>
    <x-loading :loading="xprofiler_processes_loading" top="30vh" size="middle" type="dot"></x-loading>

    <x-error-message
      v-show="globalProcessTip || xprofiler_processes_load_error"
      :message="globalProcessTip || xprofiler_processes_load_error"
      top="calc(30vh -  21px)"
    ></x-error-message>

    <div v-if="display && nodeProcesses.length">
      <Alert class="x-alert tip" type="info">
        <div class="alert-group">
          <Icon style="color: #2376b7;`" type="ios-alert-outline" />
          <div class="alert-desc">
            <span>暂无监控数据，可以点击</span>
            <span class="tip-status">&nbsp;插件状态&nbsp;</span>
            <span>查看对应进程插件日志目录是否和 xtransit 配置采集目录一致，如提示日志目录已正确配置请等待约 1 ~ 2min 以处理第一次上报进程数据</span>
          </div>
        </div>
      </Alert>
      <x-node :processes="nodeProcesses"></x-node>
    </div>

    <div v-show="display && !nodeProcesses.length" class="content">
      <!-- process panel -->
      <div class="panel">
        <!-- show process panel -->
        <transition name="slide">
          <x-panel
            style="height: 100%"
            ref="panel"
            v-show="display"
            :processes="showedProcesses"
            @selectPid="selectPid"
          ></x-panel>
        </transition>
      </div>

      <!-- process data -->
      <div class="data">
        <!-- process line -->
        <div class="process-line-body">
          <div class="section-title-group">
            <div class="section-title">{{ lineTitle }}</div>
            <Checkbox v-model="onlyAlived" style="margin-left: 7px;">
              <span></span>
            </Checkbox>
          </div>

          <!-- show process line -->
          <transition name="slide-rightward">
            <x-line ref="line" v-show="display" :processes="showedProcesses" @selectPid="selectPid"></x-line>
          </transition>
        </div>

        <!-- show process sorted catalogue-->
        <div class="process-catalogue-body">
          <!-- show sorted catalogue -->
          <transition name="slide-rightward">
            <x-catalogue
              ref="catalogue"
              v-show="display"
              :processes="showedProcesses"
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
              :processes="showedProcesses"
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
      nessaryQueryArgs: ["tab", "agentId"],
      onlyAlived: true,
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

.tip {
  margin-bottom: 16px;
}

.tip-status {
  font-weight: bold;
  color: #c45a65;
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