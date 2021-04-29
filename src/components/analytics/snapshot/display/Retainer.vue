<template>
  <div>
    <x-tree :data="profileTreeData" @expandNode="expandNode"></x-tree>
  </div>
</template>

<script>
import retainerModule from "@/javascripts/analytics/snapshot/display/Retainer";

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

  ...retainerModule,
};
</script>
