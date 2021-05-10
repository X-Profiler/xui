<template>
  <div>
    <x-tree
      :data="profileTreeData"
      @expandNode="expandNode"
      @showExtra="showExtra"
      @hiddenExtra="hiddenExtra"
      @expandParent="expandParent"
    ></x-tree>
  </div>
</template>

<script>
import containmentModule from "@/javascripts/analytics/snapshot/display/Dominator";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },

    data: {
      type: Object,
      default: () => ({ list: [] }),
    },
  },

  data() {
    return {
      profileTreeData: {},
    };
  },

  ...containmentModule,
};
</script>
