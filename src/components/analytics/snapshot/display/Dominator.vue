<template>
  <div>
    <x-tree
      :data="profileTreeData"
      @expandNode="expandNode"
      @showExtra="showExtra"
      @hiddenExtra="hiddenExtra"
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
  },

  data() {
    return {
      profileTreeData: [],
    };
  },

  ...containmentModule,
};
</script>
