<template>
  <div>
    <!-- line group -->
    <div class="process-line-group">
      <div
        v-for="(process, index) in processes"
        :key="index"
        style="background-color: #e8eaec;width: 100%"
      >
        <div
          class="process-line"
          :style="getProcessLineStyle(index) + process.selectedStyle"
          @mouseover="mouseover(process, $event)"
          @mousemove="mousemove(process, $event)"
          @mouseout="mouseout(process, $event)"
          @click="selectPid(index)"
        ></div>
      </div>
    </div>

    <!-- time group -->
    <div class="process-line-label-group">
      <div v-for="(time, index) in times" :key="index" class="process-line-label">
        <div>{{ time.value }}</div>
        <div>{{ time.label }}</div>
      </div>
    </div>

    <!-- tooltip -->
    <x-tip :processData="processData"></x-tip>
  </div>
</template>

<script>
import Tip from "./Tip";
import lineModule from "../../../javascripts/instance/process/Line";

const lineData = Object.assign(
  {
    props: {
      processes: Array
    },
    components: {
      "x-tip": Tip
    },
    data() {
      return {
        times: [],
        processData: undefined
      };
    }
  },
  lineModule
);

export default lineData;
</script>

<style scoped>
.process-line-group {
  margin: 10px 0;
}

.process-line {
  height: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.process-line-label-group {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 5px;
  justify-content: space-between;
}

.process-line-label {
  text-align: center;
}
</style>