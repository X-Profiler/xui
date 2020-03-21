<template>
  <div class="overview">
    <div class="section-title">系统信息概览</div>

    <x-loading :loading="overview_loading" type="dot" size="middle" :top="90"></x-loading>

    <x-error-message v-show="overview_load_error" :message="overview_load_error" :top="50"></x-error-message>

    <div v-if="!overview_loading && !overview_load_error" class="content">
      <x-pie2
        class="pie"
        v-for="(pie, index) in pies"
        :key="index"
        :title="pie.title"
        :percentage="pie.percentage"
      ></x-pie2>

      <!-- disk usage -->
      <x-pie2 class="pie" :percentage="90">
        <div slot="title">
          <x-dropdown :transformY="8">
            <div slot="title" class="title">Disk 使用率</div>
          </x-dropdown>
        </div>
      </x-pie2>
    </div>
  </div>
</template>

<script>
import overviewModule from "../../../javascripts/instance/system/Overview";

export default {
  data() {
    return {
      pies: [
        { title: "CPU 使用率", percentage: 12 },
        { title: "Mem 使用率", percentage: 70 }
      ]
    };
  },

  ...overviewModule
};
</script>

<style scoped>
.overview {
  min-height: 200px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.pie {
  min-width: 300px;
  flex: 1 0 300px;
}

.title {
  padding-left: 7px;
}
</style>