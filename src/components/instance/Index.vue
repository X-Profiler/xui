<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title">
      <template slot="extra">
        <transition name="slide">
          <div v-show="agents.length">
            <Select
              v-model="selectedAgentId"
              class="agent-selector"
              size="small"
              filterable
              :placeholder="placeholder"
              :not-found-text="notFoundText"
            >
              <Option
                v-for="(item, index) in agents"
                :key="index"
                :value="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Button type="info" class="agent-button" size="small">{{ checkAgentTip }}</Button>
          </div>
        </transition>
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
    <transition name="slide">
      <component
        v-if="!agentsLoading && selectedAgentId"
        :is="activeComponent"
        :appId="appId"
        :agentId="selectedAgentId"
      ></component>
    </transition>
  </div>
</template>

<script>
import indexModule from "../../javascripts/instance/Index";
import { tags } from "../../javascripts/config";
import { getTag } from "../../javascripts/lib/utils";

// instance component
import xDashboardTitle from "../common/DashboardTitle";
import xProcessData from "./ProcessData";
import xSystemData from "./SystemData";
import xErrorLog from "./ErrorLog";

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
        placeholder: getTag(tags.choseInstance),
        notFoundText: getTag(tags.noAgent),
        instanceTabs: [
          {
            label: getTag(tags.processTrend),
            icon: "md-skip-forward",
            value: "process"
          },
          {
            label: getTag(tags.systemData),
            icon: "md-desktop",
            value: "system"
          },
          {
            label: getTag(tags.errorLog),
            icon: "md-warning",
            value: "error_log"
          },
          {
            label: getTag(tags.moduleRisk),
            icon: "md-nuclear",
            value: "module_risk"
          }
        ],
        valueWhiteList: {
          selectedTab: ["process", "system", "error_log", "module_risk"],
          selectedAgentId: null
        },
        nessaryQueryArgs: ["tab", "agentId"]
      };
    },
    components: {
      "x-dashboard-title": xDashboardTitle,
      "x-process-data": xProcessData,
      "x-system-data": xSystemData,
      "x-error-log": xErrorLog
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
  margin: 15px 0 0 0;
}
</style>

