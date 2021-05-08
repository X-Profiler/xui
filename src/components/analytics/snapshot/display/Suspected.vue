<template>
  <div>Suspected</div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  created() {
    this.profile.getSuspectedLeakNodes();
  },
};
</script>
