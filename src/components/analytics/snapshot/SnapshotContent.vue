<template>
  <div>
    <transition name="slide-noward">
      <keep-alive>
        <component
          v-if="snapshotTab"
          :is="activeComponent"
          :profile="profile"
        ></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import snapshotContentModule from "@/javascripts/analytics/snapshot/SnapshotContent";
import xSuspected from "@/components/analytics/snapshot/display/Suspected";
import xDominator from "@/components/analytics/snapshot/display/Dominator";
import xContainment from "@/components/analytics/snapshot/display/Containment";
import xSearch from "@/components/analytics/snapshot/display/Search";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    "x-suspected": xSuspected,
    "x-dominator": xDominator,
    "x-containment": xContainment,
    "x-search": xSearch,
  },

  ...snapshotContentModule,
};
</script>