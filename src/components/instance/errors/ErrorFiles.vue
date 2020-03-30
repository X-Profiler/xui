<template>
  <div class="wrapper">
    <transition name="slide">
      <Select
        v-show="files_data.length"
        v-model="selectedErrorFile"
        class="agent-selector error-files-selector"
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
import errorFilesModule from "@/javascripts/instance/errors/ErrorFiles";
export default {
  data() {
    return {
      selectedErrorFile: undefined,
      nessaryQueryArgs: ["tab", "agentId"]
    };
  },
  ...errorFilesModule
};
</script>

<style scoped>
.wrapper {
  text-align: left;
}

.error-files-selector {
  text-align: left;
  width: 200px;
}
</style>