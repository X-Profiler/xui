<template>
  <div>
    <transition name="slide">
      <Select
        v-show="files_data.length"
        v-model="selectedErrorFile"
        class="agent-selector"
        size="small"
        filterable
      >
        <Option
          v-for="(item, index) in files_data"
          :key="index"
          :value="item.value"
        >{{ item.label }}</Option>
      </Select>
    </transition>
  </div>
</template>

<script>
import errorFilesModule from "@/javascripts/instance/errors/ErrorFiles";
export default {
  data() {
    return {
      selectedErrorFile: undefined
    };
  },
  ...errorFilesModule
};
</script>