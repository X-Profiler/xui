<template>
  <div>
    <Select v-model="selectedFilterType" class="agent-selector type-selector">
      <Option v-for="(item, index) in filterTypes" :key="index" :value="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
import typeFilterModule from "@/javascripts/file/TypeFilter";

export default {
  data() {
    return {
      selectedFilterType: undefined,
    };
  },

  ...typeFilterModule
};
</script>

<style scoped>
.type-selector {
  text-align: left;
  width: 150px;
}
</style>