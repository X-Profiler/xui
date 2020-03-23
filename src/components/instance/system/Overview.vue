<template>
  <div class="overview">
    <div class="section-title">系统信息概览</div>
    <x-pie2 v-show="false" ref="pieCommon"></x-pie2>

    <x-loading :loading="overview_loading" type="dot" size="middle" :top="105"></x-loading>

    <x-error-message v-show="overview_load_error" :message="overview_load_error" :top="80"></x-error-message>

    <transition name="slide-noward">
      <div v-if="!overview_loading && !overview_load_error" class="content">
        <div class="pie metrics">
          <x-error-message v-if="!currentMetrics.length" message="暂无当前系统指标数据"></x-error-message>
          <div v-else style="width: 100%">
            <div
              v-for="(metrics, index) in currentMetrics"
              :key="index"
              class="metric-content"
              :style="index !== 0 && metrics.length ? 'margin-top: 25px;' : ''"
            >
              <div v-for="(metric, index) in metrics" :key="index" class="metric-group">
                <div class="metric-key">{{ metric.key }}</div>
                <div class="metric-value">{{ metric.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-for="(pie, index) in pies" :key="index" class="pie">
          <x-error-message v-if="pie.fake" :message="pie.message"></x-error-message>
          <x-pie2 v-else :title="pie.title" :percentage="pie.percentage"></x-pie2>
        </div>

        <!-- disk usage -->
        <div class="pie">
          <x-error-message v-if="disks.fake" :message="disks.message"></x-error-message>
          <x-pie2 v-else :title="disks.title" :percentage="disks.percentage">
            <div v-if="disks.list.length" slot="title">
              <x-dropdown :transformY="8">
                <div slot="title" class="title">{{ disks.title }}</div>
                <div slot="content">
                  <div
                    v-for="(li, index) in disks.list"
                    :key="index"
                    class="disk-list x-dropdown-li"
                  >
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
    </transition>
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
  min-height: 210px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: center;
  background-color: #f8fafc;
  border-left: 10px solid #2376b7;
  height: 100%;
  min-height: 200px;
}

.pie {
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
  padding: 20px 0;
}

.metric-content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px;
  align-content: space-between;
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