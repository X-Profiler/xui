<template>
  <div>
    <x-modal
      ref="checkXprofiler"
      title="X-Profiler 插件状态"
      :width="550"
      @canceled="closeXprofilerCheck"
    >
      <template slot="content">
        <div class="container">
          <x-loading :loading="xprofiler_status_loading" type="dot" size="middle"></x-loading>
          <x-error-message
            v-show="xprofiler_status_load_error"
            :message="xprofiler_status_load_error"
          ></x-error-message>
          <transition name="slide-noward">
            <div v-show="!xprofiler_status_loading && !xprofiler_status_load_error" class="content">
              <!-- xprofiler -->
              <div class="xprofiler">
                <div>1. 插件 X-Profiler 状态：</div>
                <div class="xprofiler-status-group">
                  <div class="xprofiler-status">
                    <Icon :type="installStatus.icon" :style="installStatus.style" />
                    <div class="xprofiler-status-label">已安装</div>
                  </div>

                  <div class="xprofiler-status">
                    <Icon :type="enableStatus.icon" :style="enableStatus.style" />
                    <div class="xprofiler-status-label">已启用</div>
                  </div>

                  <div
                    class="xprofiler-status"
                    :style="validXprofiler ? 'cursor: pointer;' : ''"
                    @click="validXprofiler ? showLogdir = !!!showLogdir : ''"
                  >
                    <Icon :type="logdirStatus.icon" :style="logdirStatus.style" />
                    <div class="xprofiler-status-label">日志目录配置</div>
                  </div>
                </div>
              </div>
              <div v-if="validXprofiler && showLogdir" class="xprofiler-logdir">
                <div class="xprofiler-logdir-group">
                  <div>- 配置 xprofiler 日志目录: {{ xprofiler_status_data.xprofilerLogdir }}</div>
                </div>
                <div class="xprofiler-logdir-group">
                  <div>- 配置 xtransit 日志目录: {{ xprofiler_status_data.xtransitLogdir }}</div>
                </div>
              </div>

              <!-- xprofiler config -->
              <div class="config">
                <div>2. 插件 X-Profiler 配置：</div>
                <div class="xprofiler-status-group">
                  <div v-if="!validXprofiler" class="xprofiler-status">
                    <Icon type="md-close-circle" :style="'color: ' + wrongColor + ';'" />
                    <div class="xprofiler-status-label">无法获取</div>
                  </div>

                  <div
                    v-else
                    class="xprofiler-status"
                    style="cursor: pointer;"
                    @click="showConfig = !!!showConfig"
                  >
                    <Icon type="md-checkmark-circle" :style="'color: ' + healthyColor + ';'" />
                    <div class="xprofiler-status-label">获取成功</div>
                  </div>
                </div>
              </div>
              <div v-if="validXprofiler && showConfig" class="xprofiler-logdir">
                <div
                  v-for="(cfg, index) in config"
                  :key="index"
                  class="xprofiler-logdir-group"
                  style="font-size: 13px;"
                >
                  <div>- {{ cfg.key }}: {{ cfg.value }}</div>
                </div>
              </div>

              <!-- version -->
              <div class="version">
                <div v-html="versionInfo"></div>
              </div>
            </div>
          </transition>
        </div>
      </template>

      <template slot="footer">
        <div v-show="!xprofiler_status_loading">
          <Button type="primary" ghost @click="closeXprofilerCheck">关闭</Button>
        </div>
      </template>
    </x-modal>
  </div>
</template>

<script>
import checkXprofilerModule from "../../../javascripts/instance/process/CheckXprofiler";

const checkXprofilerData = Object.assign(
  {
    data() {
      return {
        modalQueryKey: "check-xprofiler",
        healthyColor: "#2a9446",
        wrongColor: "#e33900",
        showLogdir: false,
        showConfig: false
      };
    }
  },
  checkXprofilerModule
);

export default checkXprofilerData;
</script>

<style scoped>
.container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  /* font-size: 13px; */
  color: #373d41;
  text-align: left;
}

.xprofiler {
  display: flex;
}

.xprofiler-status-group {
  display: flex;
  margin-left: 5px;
}

.xprofiler-status {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.xprofiler-status-icon {
  /* font-size: 12px; */
}

.xprofiler-status-label {
  font-size: 12px;
  margin-left: 3px;
}

.xprofiler-logdir {
  margin-left: 16px;
}

.xprofiler-logdir-group {
  display: flex;
  font-size: 12px;
}

.config {
  margin-top: 5px;
  display: flex;
}

.version {
  margin-top: 5px;
  /* display: flex; */
  /* align-items: center; */
}
</style>