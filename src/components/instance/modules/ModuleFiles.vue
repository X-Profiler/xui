<template>
  <div class="wrapper">
    <transition name="slide">
      <Select
        v-show="files_data.length"
        v-model="selectedModuleFile"
        class="agent-selector module-files-selector"
        filterable
      >
        <Option
          v-for="(item, index) in files_data"
          :key="index"
          :value="item.value"
        >{{ item.value }}</Option>
      </Select>
    </transition>
  </div>
</template>

<script>
import moduleFiles from "@/javascripts/instance/modules/ModuleFiles";

export default {
  data() {
    return {
      selectedModuleFile: undefined,
      nessaryQueryArgs: ["tab", "agentId"],
      valueWhiteList: {
        selectedModuleFile: []
      }
    };
  },

  ...moduleFiles
};
</script>

<style scoped>
.wrapper {
  text-align: left;
}

.module-files-selector {
  text-align: left;
  width: 200px;
}
</style>