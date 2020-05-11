<template>
  <div class="wrapper">
    <!-- module risk tip -->
    <transition name="slide">
      <Alert class="x-alert" v-show="files_data.length" :type="riskTip.alertType">
        <div class="alert-group">
          <Icon :style="`color: ${riskTip.color};`" :type="riskTip.iconType" />
          <div class="alert-desc" v-html="riskTip.tip"></div>
        </div>
      </Alert>
    </transition>

    <div class="tab">
      <!-- module file selector -->
      <transition name="slide">
        <Select
          v-show="files_data.length"
          v-model="selectedModuleFile"
          class="agent-selector module-files-selector"
        >
          <Option
            v-for="(item, index) in files_data"
            :key="index"
            :value="item.value"
          >{{ item.value }}</Option>
        </Select>
      </transition>

      <!-- dependencies type -->
      <transition name="slide">
        <div class="tag-group" v-show="files_data.length">
          <div
            :class="'tag' + (dependencies ? ' tag-selected' : '')"
            @click="changeDevType(true)"
          >dependencies</div>
          <div
            :class="'tag' + (dependencies ? '' : ' tag-selected')"
            @click="changeDevType(false)"
          >devDependencies</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import moduleFiles from "@/javascripts/instance/modules/ModuleFiles";

export default {
  data() {
    return {
      selectedModuleFile: undefined,
      dependencies: undefined,
      nessaryQueryArgs: ["tab", "agentId", "file"],
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

.x-alert {
  margin-top: -5px;
}

.tab {
  display: flex;
  align-items: flex-end;
  margin-top: 11px;
}
</style>