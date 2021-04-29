<template>
  <div>
    <x-tree :data="profileTreeData" @expandNode="expandNode"></x-tree>
  </div>
</template>

<script>
import containmentModule from "@/javascripts/analytics/snapshot/display/Containment";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },

    rootId: {
      type: Number,
      default: -1,
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
