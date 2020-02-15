<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title">
      <template slot="extra">
        <Select
          v-model="selectedAgentId"
          class="agent-selector"
          size="small"
          :placeholder="placeholder"
          :not-found-text="notFoundText"
        >
          <Option v-for="item in agents" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" class="agent-button" size="small">查看信息</Button>
      </template>
    </x-dashboard-title>
  </div>
</template>

<script>
import dashboardTitle from "../common/DashboardTitle";

export default {
  props: {
    appId: Number,
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },
  data() {
    return {
      selectedAgentId: "",
      agents: [],
      placeholder: "请选择实例 ID",
      notFoundText: "暂无实例"
    };
  },
  components: {
    "x-dashboard-title": dashboardTitle
  }
};
</script>

<style scoped>
.agent-selector {
  width: 250px;
  margin-left: 20px;
}

.agent-button {
  width: 65px;
  margin-left: 10px;
  font-size: 12px;
}
</style>
