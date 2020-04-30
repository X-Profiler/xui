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

    <!-- alarm configure -->
    <x-alarm-configure></x-alarm-configure>

    <!-- divide line -->
    <div class="divide-line"></div>

    <!-- alarm rules -->
    <x-alarm-rules></x-alarm-rules>

    <!-- tip modal -->
    <x-modal ref="tip" :title="tipData.title" :padding="0" @canceled="closeTipModal" hide-footer>
      <x-tip-content slot="content"></x-tip-content>
    </x-modal>
  </div>
</template>

<script>
import alarmModule from "@/javascripts/alarm/AlarmIndex";
import xAlarmConfigure from "@/components/alarm/AlarmConfigure";
import xAlarmRules from "@/components/alarm/AlarmRules";
import xTipContent from "@/components/alarm/TipContent";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-alarm-configure": xAlarmConfigure,
    "x-alarm-rules": xAlarmRules,
    "x-tip-content": xTipContent
  },

  data() {
    return {
      modalQueryKey: "alarm-tip"
    };
  },

  ...alarmModule
};
</script>

<style scoped>
.tip {
  margin: 15px 0;
}

.divide-line {
  margin-top: 40px;
  height: 15px;
  width: 100%;
  border-top: 1px solid #dcdee2;
}
</style>
