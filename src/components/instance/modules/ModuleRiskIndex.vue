<template>
  <div>
    <!-- show module files -->
    <x-module-files v-show="!files_loading && !files_load_error && !modules_load_error"></x-module-files>

    <!-- loading -->
    <x-loading :loading="files_loading" type="dot" size="small" top="30vh"></x-loading>
    <x-loading :loading="modules_loading" type="dot" size="small" top="calc(30vh - 32px)"></x-loading>

    <!-- error message -->
    <x-error-message
      v-show="(!files_loading && files_load_error) || (!modules_loading && modules_load_error)"
      :message="files_load_error || modules_load_error"
      top="calc(30vh -  25px)"
    ></x-error-message>
  </div>
</template>

<script>
import riskModule from "@/javascripts/instance/modules/ModuleRiskIndex";
import xModuleFiles from "@/components/instance/modules/ModuleFiles";

export default {
  components: {
    "x-module-files": xModuleFiles
  },

  ...riskModule
};
</script>