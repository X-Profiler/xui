<template>
  <div>
    <!-- show module files -->
    <x-module-files v-show="!files_loading && !files_load_error && !module_load_error"></x-module-files>

    <!-- show module detail -->
    <x-module-detail class="module-detail" v-if="moduleFile"></x-module-detail>

    <!-- loading -->
    <x-loading :loading="files_loading" type="dot" size="middle" top="30vh"></x-loading>
    <x-loading :loading="module_loading" type="dot" size="middle" top="calc(30vh - 72px)"></x-loading>

    <!-- error message -->
    <x-error-message
      v-show="(!files_loading && files_load_error) || (!module_loading && module_load_error)"
      :message="files_load_error || module_load_error"
      top="calc(30vh -  25px)"
    ></x-error-message>
  </div>
</template>

<script>
import riskModule from "@/javascripts/instance/modules/ModuleRiskIndex";
import xModuleFiles from "@/components/instance/modules/ModuleFiles";
import xModuleDetail from "@/components/instance/modules/ModuleDetail";

export default {
  components: {
    "x-module-files": xModuleFiles,
    "x-module-detail": xModuleDetail
  },

  ...riskModule
};
</script>

<style scoped>
.module-detail {
  margin-top: 15px;
}
</style>