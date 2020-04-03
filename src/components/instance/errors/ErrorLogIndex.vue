<template>
  <div>
    <!-- show error files -->
    <x-error-files v-show="!files_loading && !files_load_error && !logs_load_error"></x-error-files>

    <!-- show error logs -->
    <x-error-logs class="error-logs" v-if="errorFile"></x-error-logs>

    <!-- loading -->
    <x-loading :loading="files_loading" type="dot" size="middle" top="30vh"></x-loading>
    <x-loading :loading="logs_loading" type="dot" size="middle" top="calc(30vh - 32px)"></x-loading>

    <!-- error message -->
    <x-error-message
      v-show="(!files_loading && files_load_error) || (!logs_loading && logs_load_error)"
      :message="files_load_error || logs_load_error"
      top="calc(30vh -  25px)"
    ></x-error-message>
  </div>
</template>

<script>
import errorLogModule from "@/javascripts/instance/errors/ErrorLogIndex";
import xErrorFiles from "@/components/instance/errors/ErrorFiles";
import xErrorLogs from "@/components/instance/errors/ErrorLogs";

export default {
  components: {
    "x-error-files": xErrorFiles,
    "x-error-logs": xErrorLogs
  },

  ...errorLogModule
};
</script>

<style scoped>
.error-logs {
  margin-top: 15px;
}
</style>