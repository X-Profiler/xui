<template>
  <div class="process-chart-group">
    <x-scatter
      v-for="(chart, index) in scatters"
      class="process-scatter"
      :key="index"
      :display="display"
      :fields="chart.fields"
      :xAxisUnit="chart.xAxisUnit"
      :yAxisUnit="chart.yAxisUnit"
      :data="processes"
      @select="selectPid"
    >
      <template v-slot:header="{ proc }">
        <div class="scatter-header" :style="'background-color: ' + proc.color">PID: {{ proc.pid }}</div>
      </template>
      <template v-slot:content="{ proc, fields, unit }">
        <div class="scatter-content">
          <div
            v-for="(scatter, index) in scatterContent"
            :key="index"
            class="scatter-content-group"
          >
            <div class="scatter-content-key">{{ scatter.label }}</div>
            <div class="scatter-content-value">{{ proc[scatter.value] }}</div>
          </div>

          <div
            style="margin-top:3px;"
            v-for="(field, index) in fields"
            :key="field"
            class="scatter-content-group"
          >
            <div class="scatter-content-key">{{ field }}</div>
            <div class="scatter-content-value">{{ proc[field] }}{{ unit[index] }}</div>
          </div>
        </div>
      </template>
    </x-scatter>
  </div>
</template>

<script>
import scatModule from "../../../javascripts/instance/process/Scat";

const scatData = Object.assign(
  {
    props: {
      display: Boolean,
      processes: Array
    },

    data() {
      return {
        scatters: [
          {
            fields: ["HEAP", "CPU"],
            xAxisUnit: ["%", "-3.8em"],
            yAxisUnit: ["%", "0"]
          },
          {
            fields: ["RSS", "GC"],
            xAxisUnit: ["MB", "-3.8em"],
            yAxisUnit: ["%", "0"]
          }
        ],
        scatterContent: [{ label: "命令", value: "cmd" }]
      };
    }
  },
  scatModule
);

export default scatData;
</script>

<style scoped>
.process-chart-group {
  display: flex;
  flex-wrap: wrap;
}

.process-scatter {
  min-width: 300px;
  min-height: 300px;
  flex: 1 0 300px;
}

.scatter-header {
  color: #fff;
  padding-top: 3px;
  padding-bottom: 1px;
  padding-left: 5px;
  font-size: 12px;
  max-width: 300px;
}

.scatter-content {
  padding: 5px 5px;
  font-size: 12px;
  max-width: 300px;
}

.scatter-content-group {
  display: flex;
  align-items: center;
}

.scatter-content-key {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  min-width: 50px;
}

.scatter-content-value {
  word-wrap: break-word;
  word-break: break-all;
}
</style>