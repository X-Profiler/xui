<template>
  <div class="opt">
    <div v-for="(opt, index) in operations" :key="index" class="container">
      <div v-if="opt.type === 'button'" class="opt-group">
        <Button
          :class="'opt-button' + (opt.fixed ? '' : ' button-hover')"
          shape="circle"
          :loading="opt.loading"
          :type="opt.bt"
          :disabled="opt.disabled"
          :icon="opt.icon"
          @click="takeAction(opt)"
        ></Button>
        <div class="opt-label" :style="`color: ${opt.color};`">{{ formatLabel(opt.label) }}</div>
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
      xprofiler: ["gcprofile", "diag", "trend", "cpuprofile"],
      normalColor: "#515a6e",
      disableColor: "#c5c8ce",
      successColor: "#2a9446",
      infoColor: "#2376b7",
      warningColor: "#f89501",
      errorColor: "#e33900"
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

.opt-button {
  transition: all 0.15s cubic-bezier(0.29, 1.94, 0.54, 1.98);
}

.button-hover:hover {
  transform: scale(1.1);
}
</style>