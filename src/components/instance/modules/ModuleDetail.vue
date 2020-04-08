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

      <!-- package version -->
      <template v-slot:packageVersion="{ row }">
        <div class="font">{{ row.version }}</div>
      </template>

      <!-- package lock version -->
      <template v-slot:packageLockVersion="{ row }">
        <div class="font">{{ row.lockVersion }}</div>
      </template>

      <!-- security -->
      <template v-slot:securityRisk="{ row }">
        <div
          v-if="row.risk"
          class="font risk-label"
          :style="`color: ${row.color};`"
          @click="openRiskModal(row)"
        >{{ row.level }}</div>
        <!-- no risk -->
        <div v-else>
          <Icon class="no-risk" type="md-checkmark" />
        </div>
      </template>
    </x-table>

    <!-- risk detail -->
    <x-modal
      ref="riskDetail"
      title="安全风险详情"
      :padding="0"
      @canceled="closeRiskModal"
      hide-footer
      fullscreen
    >
      <x-risk-message slot="content"></x-risk-message>
    </x-modal>
  </div>
</template>

<script>
import moduleDetail from "@/javascripts/instance/modules/ModuleDetail";
import xRiskMessage from "@/components/instance/modules/RiskMessage";

export default {
  components: {
    "x-risk-message": xRiskMessage
  },

  data() {
    return {
      columns: [
        { title: "模块名称", value: "moduleName", width: "31%" },
        {
          title: "设置版本规则",
          value: "packageVersion",
          align: "center",
          width: "25%"
        },
        {
          title: "版本锁定信息",
          value: "packageLockVersion",
          align: "center",
          width: "25%"
        },
        {
          title: "安全风险等级",
          value: "securityRisk",
          align: "center",
          width: "19%"
        }
      ],
      modalQueryKey: "risk-detail"
    };
  },

  ...moduleDetail
};
</script>

<style scoped>
.content {
  color: #373d41;
}

.font {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  font-family: PingFangSC-Regular, "Titillium Web", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}

.risk-label {
  font-weight: bold;
  cursor: pointer;
}

.risk-label:hover {
  opacity: 0.75;
  transition: all 0.1s ease-in;
  transform: scale(1.2);
  user-select: none;
}

.no-risk {
  color: #2a9446;
  transform: scale(1.5);
}

.name {
  font-size: 14px;
  /* font-weight: bold; */
}

.name a {
  color: #2689d6;
}

.name a:hover {
  transition: all 0.1s ease-in;
  color: rgb(43, 133, 228, 0.75);
  font-style: italic;
  text-decoration: underline;
}
</style>