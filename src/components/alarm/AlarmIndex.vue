<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line></x-dashboard-title>

    <!-- message -->
    <Alert class="x-alert tip" type="info">
      <div class="alert-group">
        <Icon style="color: #2376b7;`" type="ios-alert-outline" />
        <div class="alert-desc">
          <span>在这里您可以基于自定义</span>
          <a href="https://github.com/jacksonTian/boolex" target="_blank">
            <code>&nbsp;DSL&nbsp;</code>
          </a>
          <span>灵活地配置基础告警规则，以便在应用遇到问题时及时感知</span>
        </div>
      </div>
    </Alert>
  </div>
</template>

<script>
import alarmModule from "@/javascripts/alarm/AlarmIndex";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  ...alarmModule
};
</script>

<style scoped>
.tip {
  margin-top: 15px;
}
</style>
