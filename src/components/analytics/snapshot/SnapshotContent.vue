<template>
  <div>
    <transition name="slide-noward">
      <component
        v-if="snapshotTab"
        :is="activeComponent"
        :data="profile"
      ></component>
    </transition>
  </div>
</template>

<script>
import snapshotContentModule from "@/javascripts/analytics/snapshot/SnapshotContent";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {},

  ...snapshotContentModule,
};
</script>