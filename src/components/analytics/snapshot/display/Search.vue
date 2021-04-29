<template>
  <div>
    <div class="section-title">Edge 视图</div>
    <x-containment :profile="profile"></x-containment>
  </div>
</template>

<script>
import xContainment from "./Containment";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    "x-containment": xContainment,
  },
};
</script>
