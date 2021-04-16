<template>
  <div>
    <Tabs type="card" v-model="selectedTab">
      <TabPane
        v-for="(tab, index) in snapshotTabs"
        :key="index"
        :label="tab.label"
        :name="tab.value"
      ></TabPane>
    </Tabs>
  </div>
</template>

<script>
import snapshotTabModule from "@/javascripts/analytics/snapshot/SnapshotTab";

export default {
  data() {
    return {
      selectedTab: undefined,
      snapshotTabs: [
        { label: "JavaScript 栈", value: "jsStacks" },
        { label: "Native 栈", value: "nativeStacks" },
        { label: "Libuv 句柄", value: "libuvHandles" },
        { label: "系统信息", value: "system" },
      ],
      nessaryQueryArgs: ["show-snapshot", "snapshotTab", "snapshotData"],
    };
  },

  ...snapshotTabModule,
};
</script>