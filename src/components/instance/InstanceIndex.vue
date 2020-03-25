<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title">
      <template slot="extra">
        <x-loading
          :loading="agents_loading"
          :top="5"
          size="small"
          :style="agents_loading ? 'margin-left: 25px':''"
        ></x-loading>
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

    <x-error-message v-if="agents_load_error" :message="agents_load_error" top="calc(35vh - 50px)"></x-error-message>

    <div v-if="!agents_loading && !agents_load_error">
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
        <!-- <keep-alive> -->
        <component v-if="selectedAgentId" :is="activeComponent" :appId="appId"></component>
        <!-- </keep-alive> -->
      </transition>
    </div>

    <!-- modal for check instance -->
    <x-check-agent></x-check-agent>
  </div>
</template>

<script>
import indexModule from "@/javascripts/instance/InstanceIndex";
import { tags } from "@/javascripts/config";
import { getTag } from "@/javascripts/lib/utils";

// instance component
import xProcess from "@/components/instance/process/ProcessIndex";
import xSystem from "@/components/instance/system/SystemIndex";
import xErrorLog from "@/components/instance/errors/ErrorLogIndex";
import xModuleRisk from "@/components/instance/ModuleRisk";
import xCheckAgent from "@/components/instance/CheckAgent";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-process": xProcess,
    "x-system": xSystem,
    "x-error-log": xErrorLog,
    "x-module-risk": xModuleRisk,
    "x-check-agent": xCheckAgent
  },

  data() {
    return {
      selectedAgentId: undefined,
      selectedTab: undefined,
      agents: [],
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
      nessaryQueryArgs: ["tab", "agentId"]
    };
  },

  ...indexModule
};
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

