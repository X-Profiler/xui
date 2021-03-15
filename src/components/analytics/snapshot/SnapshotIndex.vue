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
          :loading="loading"
          top="calc(40vh - 50px)"
          type="dot"
          size="large"
        ></x-loading>
      </div>

      <x-error-message
        v-show="error"
        :message="error"
        top="calc(40vh - 57px)"
      ></x-error-message>

      <x-error-message
        v-show="progress"
        :message="progress"
        top="calc(40vh - 57px)"
      ></x-error-message>

      <transition name="slide-noward">
        <div v-if="!loading && !error" class="snapshot-detail"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import snapshotModule from "@/javascripts/analytics/snapshot/SnapshotIndex";

export default {
  data() {
    return {
      loading: true,
      progress: null,
      error: null,
      request: null,
      file: null,
    };
  },

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