<template>
  <div>
    <x-dashboard-title appName="诊断报告分析" :dashboardTitle="diagData.fileBasename" line></x-dashboard-title>
  </div>
</template>

<script>
import diagModule from "@/javascripts/analytics/diag/DiagIndex";

export default {
  ...diagModule
};
</script>