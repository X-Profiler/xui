<template>
  <div>
    <transition name="slide-noward">
      <component v-if="diagTab" :is="activeComponent" :data="file_data"></component>
    </transition>
  </div>
</template>

<script>
import diagContentModule from "@/javascripts/analytics/diag/DiagContent";
import xJavaScript from "@/components/analytics/diag/display/JavaScript";

export default {
  components: {
    "x-javascript": xJavaScript
  },

  ...diagContentModule
};
</script>