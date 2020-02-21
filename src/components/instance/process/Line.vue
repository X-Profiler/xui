<template>
  <div>
    <div class="process-line-group">
      <div
        v-for="(process, index) in processes"
        :key="index"
        style="background-color: #e8eaec;width: 100%"
      >
        <div
          class="process-line"
          :style="getProcessLineStyle(index) + process.selectedStyle"
          @click="selectPid(index)"
        ></div>
      </div>
    </div>
    <div class="process-line-label-group">
      <div v-for="(time, index) in times" :key="index" class="process-line-label">
        <div>{{ time.value }}</div>
        <div>{{ time.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import lineModule from "../../../javascripts/instance/process/Line";

const lineData = Object.assign(
  {
    props: {
      processes: Array
    },
    data() {
      return {
        times: []
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

.process-line:hover {
  -webkit-transform: scaleY(1.3);
  transform: scaleY(1.3);
  /* box-shadow: 0 0 0 2px rgb(248, 152, 0, 0.4); */
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