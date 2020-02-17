<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title">
      <template slot="extra">
        <Select
          filterable
          v-model="selectedAgentId"
          class="agent-selector"
          size="small"
          :placeholder="placeholder"
          :not-found-text="notFoundText"
        >
          <Option v-for="(item, index) in agents" :key="index" :value="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="info" class="agent-button" size="small">查看实例</Button>
      </template>
    </x-dashboard-title>

    <!-- content -->
    <transition name="slide-downward">
      <div class="instance-content" v-show="!agentsLoading">
        <!-- instance tab -->
        <Tabs class="instance-tab" v-model="selectedTab">
          <TabPane
            v-for="(tab, index) in instanceTabs"
            :key="index"
            :label="tab.label"
            :icon="tab.icon"
            :name="tab.value"
          ></TabPane>
        </Tabs>
      </div>
    </transition>

    <!-- instance content -->
  </div>
</template>

<script>
import dashboardTitle from "../common/DashboardTitle";
import indexModule from "../../javascripts/instance/Index";

const indexData = Object.assign(
  {
    props: {
      appId: Number,
      appName: String,
      title: String,
      currentUserIsOwner: Boolean
    },
    data() {
      return {
        selectedAgentId: undefined,
        selectedTab: undefined,
        agents: [],
        agentsLoading: true,
        placeholder: "请选择实例 ID",
        notFoundText: "暂无实例",
        instanceTabs: [
          { label: "进程数据", icon: "md-skip-forward", value: "process" },
          { label: "系统监控", icon: "md-desktop", value: "system" },
          { label: "异常日志", icon: "md-warning", value: "error_log" },
          { label: "模块风险", icon: "md-nuclear", value: "module_risk" }
        ],
        nessaryQueryArgs: ["tab", "agentId"]
      };
    },
    components: {
      "x-dashboard-title": dashboardTitle
    }
  },
  indexModule
);

export default indexData;
</script>

<style scoped>
.agent-selector {
  width: 250px;
  margin-left: 20px;
}

.agent-button {
  width: 70px;
  margin-left: 10px;
  font-size: 11px;
}

.instance-content {
  margin: 15px 0;
}
</style>

