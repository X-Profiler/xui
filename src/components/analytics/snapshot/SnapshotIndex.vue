<template>
  <div>
    <x-dashboard-title
      appName="堆快照分析"
      :dashboardTitle="snapshotData.fileBasename"
      line
    ></x-dashboard-title>

    <div class="snapshot-content">
      <div class="snapshot-loading">
        <x-loading
          :loading="file_loading"
          top="calc(40vh - 50px)"
          type="dot"
          size="large"
        ></x-loading>
      </div>

      <x-error-message
        v-show="file_load_error"
        :message="file_load_error"
        top="calc(40vh - 57px)"
      ></x-error-message>

      <transition name="slide-noward">
        <div v-if="!file_loading && !file_load_error" class="snapshot-detail">
          <!-- snapshot -->
          <!-- <x-flamegraph :snapshotData="customData.flamegraph"></x-flamegraph> -->
          {{ file_data }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import snapshotModule from "@/javascripts/analytics/snapshot/SnapshotIndex";

export default {
  ...snapshotModule,
};
</script>

<style scoped>
.snapshot-content {
  margin-top: 15px;
}

.snapshot-loading {
  text-align: center;
}
</style>