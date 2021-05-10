<template>
  <div>
    <Tabs type="card" v-model="selectedTab">
      <TabPane
        v-for="(tab, index) in diagTabs"
        :key="index"
        :label="tab.label"
        :name="tab.value"
      ></TabPane>
    </Tabs>
  </div>
</template>

<script>
import dataTabModule from "@/javascripts/analytics/diag/DataTab";

export default {
  data() {
    return {
      selectedTab: undefined,
      diagTabs: [
        { label: "JavaScript 栈", value: "jsStacks" },
        { label: "Native 栈", value: "nativeStacks" },
        { label: "Libuv 句柄", value: "libuvHandles" },
        { label: "系统信息", value: "system" },
      ],
      nessaryQueryArgs: [
        "filterType",
        "page",
        "diag-analytics",
        "diagTab",
        "diagData",
      ],
    };
  },

  ...dataTabModule,
};
</script>