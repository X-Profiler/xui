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
import xNative from "@/components/analytics/diag/display/Native";
import xLibuv from "@/components/analytics/diag/display/Libuv";
import xSystemView from "@/components/analytics/diag/display/SystemView";

export default {
  components: {
    "x-javascript": xJavaScript,
    "x-native": xNative,
    "x-libuv": xLibuv,
    "x-system-view": xSystemView
  },

  ...diagContentModule
};
</script>