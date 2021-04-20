<template>
  <div>
    <x-tree :data="profileTreeData"></x-tree>
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
  },

  data() {
    return {
      profileTreeData: [],
    };
  },

  ...containmentModule,
};
</script>
