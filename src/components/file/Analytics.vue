<template>
  <div>
    <!-- show diag analytics -->
    <x-drawer ref="diag" @close="closeDiagDrawer()">
      <template slot="content">
        <x-diag class="analytics"></x-diag>
      </template>
    </x-drawer>

    <!-- show gc analytics -->
    <x-drawer ref="gc" @close="closeGcDrawer()">
      <template slot="content">
        <x-gc class="analytics"></x-gc>
      </template>
    </x-drawer>
  </div>
</template>

<script>
import analyticsModule from "@/javascripts/file/Analytics";
import diag from "@/components/analytics/diag/DiagIndex";
import gc from "@/components/analytics/gc/GcIndex";

export default {
  components: {
    "x-diag": diag,
    "x-gc": gc
  },

  data() {
    return {
      diagDrawerKey: "diag-analytics",
      gcDrawerKey: "gc-analytics",
      whiteQueryKeys: ["filterType", "page"]
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