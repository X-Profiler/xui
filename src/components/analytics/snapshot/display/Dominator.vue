<template>
  <div>
    <x-tree :data="profileTreeData" @expandNode="expandNode"></x-tree>
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
