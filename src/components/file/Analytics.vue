<template>
  <div>
    <!-- show diag analytics -->
    <x-drawer ref="diag" @close="closeDiagDrawer()">
      <template slot="content">
        <x-diag></x-diag>
      </template>
    </x-drawer>

    <!-- show gc analytics -->
    <x-drawer ref="gc" @close="closeGcDrawer()"></x-drawer>
  </div>
</template>

<script>
import analyticsModule from "@/javascripts/file/Analytics";
import diag from "@/components/analytics/diag/DiagIndex";

export default {
  components: {
    "x-diag": diag
  },

  data() {
    return {
      diagDrawerKey: "diag-analytics",
      gcDrawerKey: "gc-analytics"
    };
  },

  ...analyticsModule
};
</script>