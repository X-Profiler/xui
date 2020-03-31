<template>
  <div v-show="!module_loading && !module_load_error">
    <x-table :columns="columns" :data="modules" noDataText="当前应用暂无模块依赖信息" no-data-head></x-table>
  </div>
</template>

<script>
import moduleDetail from "@/javascripts/instance/modules/ModuleDetail";

export default {
  data() {
    return {
      columns: [
        { title: "模块名称", value: "moduleName" },
        { title: "设置版本规则", value: "packageVersion", align: "center" },
        { title: "版本锁定信息", value: "packageLockVersion", align: "center" },
        { title: "安全风险", value: "securityRisk", align: "center" }
      ]
    };
  },

  ...moduleDetail
};
</script>