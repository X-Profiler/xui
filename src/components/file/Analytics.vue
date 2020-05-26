<template>
  <div>
    <!-- show diag analytics -->
    <x-drawer ref="diag" @close="closeDiagDrawer()">
      <x-diag slot="content" class="analytics"></x-diag>
    </x-drawer>

    <!-- show gc analytics -->
    <x-drawer ref="gc" @close="closeGcDrawer()">
      <x-gc slot="content" class="analytics"></x-gc>
    </x-drawer>

    <!-- show trends -->
    <x-drawer ref="trend" @close="closeTrendDrawer()">
      <x-trend slot="content" class="analytics"></x-trend>
    </x-drawer>
  </div>
</template>

<script>
import analyticsModule from "@/javascripts/file/Analytics";
import xDiag from "@/components/analytics/diag/DiagIndex";
import xGc from "@/components/analytics/gc/GcIndex";
import xTrend from "@/components/analytics/trend/TrendIndex";

export default {
  components: {
    "x-diag": xDiag,
    "x-gc": xGc,
    "x-trend": xTrend
  },

  data() {
    return {
      diagDrawerKey: "diag-analytics",
      gcDrawerKey: "gc-analytics",
      trendDrawerKey: "show-trend",
      whiteQueryKeys: ["filterType", "page"],
      forceGoBack: true
    };
  },

  ...analyticsModule
};
</script>

<style scoped>
.analytics {
  padding: 10px 20px;
}
</style>>