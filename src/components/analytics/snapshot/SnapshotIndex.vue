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
        :theme="theme"
        :icon="false"
        top="calc(40vh - 57px)"
      ></x-error-message>

      <transition name="slide-noward">
        <div v-if="!loading && !error && !progress" class="snapshot-detail">
          <!-- snapshot overview -->
          <x-overview :data="overviewData"></x-overview>

          <!-- snapshot tab -->
          <x-snapshot-tab class="snapshot-tab"></x-snapshot-tab>

          <!-- snapshot content -->
          <x-snapshot-content :profile="profile"></x-snapshot-content>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import snapshotModule from "@/javascripts/analytics/snapshot/SnapshotIndex";
import xOverview from "@/components/analytics/Overview";
import xSnapshotTab from "@/components/analytics/snapshot/SnapshotTab";
import xSnapshotContent from "@/components/analytics/snapshot/SnapshotContent";

export default {
  components: {
    "x-overview": xOverview,
    "x-snapshot-tab": xSnapshotTab,
    "x-snapshot-content": xSnapshotContent,
  },

  data() {
    return {
      loading: true,
      theme: 0,
      progress: null,
      error: null,
      request: null,
      file: null,
      profile: null,
      fileSize: null,
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

.snapshot-tab {
  margin-top: 23px;
}
</style>