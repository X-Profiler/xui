<template>
  <div v-show="!module_loading && !module_load_error">
    <x-table :columns="columns" :data="modules" noDataText="当前应用暂无模块依赖信息" no-data-head>
      <!-- module name -->
      <template v-slot:moduleName="{ row }">
        <div class="name font">
          <a
            v-if="row.resolved"
            :href="row.resolved"
            :download="row.name"
            target="_blank"
          >{{ row.name }}</a>
          <div v-else>{{ row.name }}</div>
        </div>
      </template>
    </x-table>
  </div>
</template>

<script>
import moduleDetail from "@/javascripts/instance/modules/ModuleDetail";

export default {
  data() {
    return {
      columns: [
        { title: "模块名称", value: "moduleName", width: "31%" },
        {
          title: "设置版本规则",
          value: "packageVersion",
          align: "center",
          width: "23%"
        },
        {
          title: "版本锁定信息",
          value: "packageLockVersion",
          align: "center",
          width: "23%"
        },
        {
          title: "安全风险",
          value: "securityRisk",
          align: "center",
          width: "23%"
        }
      ]
    };
  },

  ...moduleDetail
};
</script>

<style scoped>
.font {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  font-family: PingFangSC-Regular,'Titillium Web','Helvetica Neue',Helvetica,Arial,'Hiragino Sans GB',STHeiti,'Microsoft YaHei','WenQuanYi Micro Hei',sans-serif;
}

.name {
  font-size: 14px;
  /* font-weight: bold; */
}

.name a {
  color: rgb(43, 133, 228);
}

.name a:hover {
  color: rgb(43, 133, 228, 0.75);
  font-style: italic;
  text-decoration: underline;
}
</style>