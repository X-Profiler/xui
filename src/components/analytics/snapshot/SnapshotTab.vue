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
        { label: "可疑泄漏节点", value: "suspected" },
        { label: "Dominator", value: "dominator" },
        { label: "Containment", value: "containment" },
        { label: "Search", value: "search" },
      ],
      nessaryQueryArgs: [
        "filterType",
        "page",
        "show-snapshot",
        "snapshotData",
        "snapshotTab",
      ],
    };
  },

  ...snapshotTabModule,
};
</script>