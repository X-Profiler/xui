<template>
  <div>
    <div class="x-modal-content">
      <x-table :columns="columns" :data="risks" noDataText="当前模块暂无安全风险信息" no-data-head stribe>
        <!-- risk module name -->
        <template v-slot:name="{ row }">
          <div class="name font">
            <a v-if="row.url" :href="row.url" target="_blank">{{ row.name }}</a>
            <div v-else>{{ row.name }}</div>
          </div>
        </template>

        <!-- current version -->
        <template v-slot:version="{ row }">
          <div class="font">{{ row.version }}</div>
        </template>

        <!-- full path -->
        <template v-slot:path="{ row }">
          <div class="font">{{ row.path }}</div>
        </template>

        <!-- vulnerable versions -->
        <template v-slot:vulnerableVersions="{ row }">
          <div class="font">{{ row.vulnerableVersions }}</div>
        </template>

        <!-- fix cmd -->
        <template v-slot:fixCmd="{ row }">
          <div class="font">{{ row.fixCmd }}</div>
        </template>

        <!-- level -->
        <template v-slot:level="{ row }">
          <div class="font">{{ row.level }}</div>
        </template>
      </x-table>
    </div>

    <!-- <div class="x-modal-footer">
      <Button type="primary" ghost @click="closeRiskModal">关闭</Button>
    </div>-->
  </div>
</template>

<script>
import riskMessageModule from "@/javascripts/instance/modules/RiskMessage";

export default {
  data() {
    return {
      columns: [
        { title: "模块", value: "name" },
        { title: "当前版本", value: "version" },
        { title: "依赖路径", value: "path", width: "30%" },
        { title: "影响版本", value: "vulnerableVersions" },
        { title: "如何修复", value: "fixCmd" },
        { title: "漏洞级别", value: "level", width: "85", align: "center" }
      ]
    };
  },

  ...riskMessageModule
};
</script>

<style scoped>
.font {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  font-family: PingFangSC-Regular, "Titillium Web", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}

.name a {
  color: #515a6e;
}

.name a:hover {
  transition: all 0.1s ease-in;
  opacity: 0.75;
  font-style: italic;
  text-decoration: underline;
}
</style>