<template>
  <div>
    <x-dashboard-title appName="GC 追踪日志分析" :dashboardTitle="gcData.fileBasename" line></x-dashboard-title>
  </div>
</template>

<script>
import gcModule from "@/javascripts/analytics/gc/GcIndex";

export default {
  ...gcModule
};
</script>