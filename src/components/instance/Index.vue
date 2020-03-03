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
            <Button
              type="info"
              class="agent-button"
              size="small"
              @click="checkAgent"
            >{{ checkAgentTip }}</Button>
          </div>
        </transition>
      </template>
    </x-dashboard-title>

    <!-- instance tab -->
    <transition name="slide-downward">
      <Tabs class="instance-tab" v-model="selectedTab">
        <TabPane
          v-for="(tab, index) in instanceTabs"
          :key="index"
          :label="tab.label"
          :icon="tab.icon"
          :name="tab.value"
        ></TabPane>
      </Tabs>
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

    <!-- modal for check instance -->
    <x-modal ref="checkAgent" title="查看实例" :width="540">
      <template slot="content">
        <div style="text-align: center">
          <x-loading :loading="checkAgentLoading" type="dot" size="middle"></x-loading>
          <x-table
            v-show="!checkAgentLoading"
            :columns="checkAgentColumns"
            :data="checkAgentData"
            noDataText="没有获取到实例信息"
          ></x-table>
        </div>
      </template>

      <template slot="footer">
        <div v-show="!checkAgentLoading">
          <Button type="primary" ghost @click="closeAgentCheck">关闭</Button>
        </div>
      </template>
    </x-modal>
  </div>
</template>

<script>
import indexModule from "../../javascripts/instance/Index";
import { tags } from "../../javascripts/config";
import { getTag } from "../../javascripts/lib/utils";

// instance component
import xDashboardTitle from "../common/DashboardTitle";
import xProcessData from "./process/Data";
import xSystemData from "./SystemData";
import xErrorLog from "./ErrorLog";
import xModuleRisk from "./ModuleRisk";
import xModal from "../common/Modal";

const indexData = Object.assign(
  {
    props: {
      appId: Number,
      appName: String,
      title: String,
      currentUserIsOwner: Boolean
    },
    components: {
      "x-dashboard-title": xDashboardTitle,
      "x-process-data": xProcessData,
      "x-system-data": xSystemData,
      "x-error-log": xErrorLog,
      "x-module-risk": xModuleRisk,
      "x-modal": xModal
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
          selectedTab: ["process", "system", "error_log", "module_risk"]
        },
        nessaryQueryArgs: ["tab", "agentId"],
        checkAgentColumns: [
          { title: "类型", value: "type", width: "130" },
          { title: "信息详情", value: "value" }
        ],
        checkAgentData: [],
        checkAgentLoading: true
      };
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

.instance-tab {
  margin: 15px 0 0 0;
}
</style>

