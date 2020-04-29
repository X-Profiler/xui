<template>
  <div>
    <!-- sub title -->
    <div class="alarm-wrapper">
      <div class="section-title alarm">已配置规则项</div>
    </div>

    <div>
      <!-- loading -->
      <x-loading :loading="rules_loading" type="dot" size="middle" :top="35"></x-loading>

      <!-- error -->
      <x-error-message
        v-show="rules_load_error"
        :message="rules_load_error"
        :top="20"
      ></x-error-message>

      <!-- show rules -->
      <x-setted-rules v-if="!rules_loading && !rules_load_error"></x-setted-rules>
    </div>
  </div>
</template>

<script>
import alarmRuleModule from "@/javascripts/alarm/AlarmRules";
import xSettedRules from "@/components/alarm/SettedRules";

export default {
  components: {
    "x-setted-rules": xSettedRules
  },

  ...alarmRuleModule
};
</script>

<style scoped>
.alarm-wrapper {
  background: #3392dc;
  color: white;
  width: 90px;
}

.alarm {
  text-align: center;
  padding: 4px 0 2px 0;
  font-size: 13px;
  margin-bottom: 15px;
}
</style>