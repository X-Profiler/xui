<template>
  <div>
    <Alert class="x-alert" type="info">
      <div class="alert-group">
        <Icon style="color: #2376b7;`" type="ios-alert-outline" />
        <div class="alert-desc">
          系统版本:
          <span class="overview">{{ osVersion }}</span>
        </div>
      </div>
    </Alert>

    <div class="content">
      <!-- env -->
      <div class="system-section">Process Env</div>
      <div v-for="(env, index) in systemEnv" :key="`env_${index}`" class="section-detail env-group">
        <Icon type="ios-arrow-forward" />
        <span class="env-key">&nbsp;{{ env.key }}</span>
        <span class="env-semi">:&nbsp;</span>
        <span class="env-value">"{{ env.value }}"</span>
      </div>

      <!-- resource limit -->
      <div class="system-section" style="margin-top: 15px;">Resource Limit</div>
      <div v-for="(limit, index) in resourceLimits" :key="`limit_${index}`" class="section-detail">
        <Icon type="ios-arrow-forward" />
        <span class="respurce-key">&nbsp;{{ limit.type }}</span>
        <span class="env-semi">:&nbsp;</span>
        Soft
        <span class="respurce-params">{{ limit.softLimit }}</span>
        Hard
        <span class="respurce-params">{{ limit.hardLimit }}</span>
      </div>

      <!--  -->
      <div class="system-section" style="margin-top: 15px;">Loaded Libraries</div>
      <div v-for="(library, index) in loadedLibraries" :key="`lib_${index}`" class="section-detail">
        <Icon type="ios-arrow-forward" />
        {{ library }}
      </div>
    </div>
  </div>
</template>

<script>
import systemViewModule from "@/javascripts/analytics/diag/display/SystemView";

export default {
  ...systemViewModule
};
</script>

<style scoped>
.overview {
  color: #c45a65;
}

.content {
  padding: 10px 17px;
  background-color: #f6f8fa;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  /* font-size: 13px; */
}

.system-section {
  font-size: 15px;
  font-weight: bold;
  color: #24292e;
}

.section-detail {
  /* margin-left: -3px; */
  margin-left: 1px;
}

.env-group {
  word-wrap: break-word;
  word-break: break-all;
}

.env-semi {
  color: #d73a49;
}

.env-value {
  color: #2a9446;
}

.respurce-params {
  color: #005cc5;
}
</style>