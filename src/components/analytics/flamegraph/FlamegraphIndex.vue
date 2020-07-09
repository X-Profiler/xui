<template>
  <div>
    <x-dashboard-title appName="CPU 火焰图" :dashboardTitle="flamegraphData.fileBasename" line></x-dashboard-title>

    <div class="flamegraph-content">
      <div class="flamegraph-loading">
        <x-loading :loading="file_loading" top="calc(40vh - 50px)" type="dot" size="large"></x-loading>
      </div>

      <x-error-message v-show="file_load_error" :message="file_load_error" top="calc(40vh - 57px)"></x-error-message>

      <transition name="slide-noward">
        <div v-if="!file_loading && !file_load_error" class="flamegraph-detail">
          <!-- flamegraph -->
          <x-flamegraph :flamegraphData="customData.flamegraph"></x-flamegraph>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import flamegraphModule from "@/javascripts/analytics/flamegraph/FlamegraphIndex";
import xFlamegraph from "@/components/analytics/flamegraph/Flamegraph";

export default {
  components: {
    "x-flamegraph": xFlamegraph
  },

  ...flamegraphModule
};
</script>

<style scoped>
.flamegraph-content {
  margin-top: 15px;
}

.flamegraph-loading {
  text-align: center;
}
</style>