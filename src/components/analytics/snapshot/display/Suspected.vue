<template>
  <div>
    <div v-for="(leak, index) in leakNodes" :key="index">{{ leak }}</div>
  </div>
</template>

<script>
import suspectedModule from "@/javascripts/analytics/snapshot/display/Suspected";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      leakNodes: [],
    };
  },

  ...suspectedModule,
};
</script>
