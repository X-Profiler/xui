<template>
  <div class="overview">
    <div class="section-title">系统信息概览</div>
    <x-pie2 v-show="false" ref="pieCommon"></x-pie2>

    <x-loading :loading="overview_loading" type="dot" size="middle" :top="90"></x-loading>

    <x-error-message v-show="overview_load_error" :message="overview_load_error" :top="65"></x-error-message>

    <div v-if="!overview_loading && !overview_load_error" class="content">
      <div class="pie metrics">
        <div style="width: calc(100% - 10px);">
          <div class="metric-content">
            <div class="metric-group">
              <div class="metric-key">load1 / 5 / 15</div>
              <div class="metric-value">2 / 3 / 4</div>
            </div>
            <div class="metric-group">
              <div class="metric-key">Node.js 进程数</div>
              <div class="metric-value">8</div>
            </div>
          </div>
          <div class="metric-content" style="margin-top: 25px">
            <div class="metric-group">
              <div class="metric-key">GC Max / Avg</div>
              <div class="metric-value">55ms / 2ms</div>
            </div>
            <div class="metric-group">
              <div class="metric-key">RT Max / Avg</div>
              <div class="metric-value">3s / 20ms</div>
            </div>
          </div>
          <div class="metric-content" style="margin-top: 25px">
            <div class="metric-group">
              <div class="metric-key">QPS</div>
              <div class="metric-value">0.2</div>
            </div>
            <div class="metric-group">
              <div class="metric-key">load1 / 5 / 15</div>
              <div class="metric-value">2 / 3 / 4</div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(pie, index) in pies" :key="index" class="pie">
        <x-error-message v-if="pie.fake" v-show="pie.fake" :message="pie.message" :top="65"></x-error-message>
        <x-pie2 v-else :title="pie.title" :percentage="pie.percentage"></x-pie2>
      </div>

      <!-- disk usage -->
      <div class="pie">
        <x-error-message v-if="disks.fake" v-show="disks.fake" :message="disks.message" :top="65"></x-error-message>
        <x-pie2 v-else :title="disks.title" :percentage="disks.percentage">
          <div v-if="disks.list.length" slot="title">
            <x-dropdown :transformY="8">
              <div slot="title" class="title">{{ disks.title }}</div>
              <div slot="content">
                <div v-for="(li, index) in disks.list" :key="index" class="disk-list x-dropdown-li">
                  <div
                    class="status-dot"
                    :style="'background-color: ' + getColor(li.percentage) + ';'"
                  ></div>
                  <div>{{ li.disk }}</div>
                  <div class="disk-percentage">{{ li.percentage }}%</div>
                </div>
              </div>
            </x-dropdown>
          </div>
        </x-pie2>
      </div>
    </div>
  </div>
</template>

<script>
import overviewModule from "../../../javascripts/instance/system/Overview";

export default {
  ...overviewModule
};
</script>

<style scoped>
.overview {
  min-height: 200px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: center;
  background-color: #f8fafc;
  border-left: 10px solid #2376b7;
}

.pie {
  min-width: 300px;
  flex: 1 0 300px;
}

.title {
  padding-left: 7px;
}

.disk-list {
  font-size: 13px;
}

.disk-percentage {
  padding-left: 30px;
  width: 100%;
  text-align: right;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  margin-right: 12px;
  flex-shrink: 0;
}

.metrics {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.metric-content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px;
}

.metric-group {
  flex: 1 0 50%;
}

.metric-key {
  font-size: 12px;
  color: #919597;
}

.metric-value {
  /* font-size: 13px; */
  font-family: PingFangSC-Regular;
  font-weight: bold;
  margin-top: 2px;
  color: #373d41;
}
</style>