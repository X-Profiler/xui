<template>
  <div class="opt">
    <div v-for="(opt, index) in operations" :key="index" class="container">
      <div v-if="opt.type === 'button'" class="opt-group">
        <Button
          shape="circle"
          :loading="opt.loading"
          :type="opt.bt"
          :disabled="opt.disabled"
          :icon="opt.icon"
        ></Button>
        <div class="opt-label" :style="`color: ${opt.color};`">{{ opt.label }}</div>
      </div>

      <div v-else class="line" :style="`color: ${opt.color};`"></div>
    </div>
  </div>
</template>

<script>
import operationModule from "@/javascripts/file/list/Operation";

export default {
  props: {
    row: Object
  },

  data() {
    return {
      operations: [],
      devtools: ["cpuprofile", "heapprofile", "heapsnapshot"],
      devtools2: ["cpuprofile", "heapprofile", "heapsnapshot"],
      xprofiler: ["gcprofile", "diag", "cpuprofile", "heapsnapshot"],
      disableColor: "#c5c8ce",
      successColor: "#2a9446",
      infoColor: "#2376b7",
      warningColor: "#f89501"
    };
  },

  ...operationModule
};
</script>

<style scoped>
.opt {
  display: flex;
}

.container {
  display: flex;
  align-items: center;
}

.opt-group {
  text-align: center;
  width: 50px;
}

.opt-label {
  margin-top: 5px;
  text-align: center;
  font-size: 12px;
  user-select: none;
}

.line {
  width: 25px;
  border-bottom: 1px solid;
  margin-bottom: 23px;
}
</style>