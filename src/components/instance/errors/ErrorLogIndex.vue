<template>
  <div>
    <!-- loading -->
    <x-loading :loading="files_loading || logs_loading" type="dot" top="35vh"></x-loading>

    <!-- error message -->
    <x-error-message
      v-show="files_load_error ||logs_load_error"
      :message="files_load_error ||logs_load_error"
      top="calc(35vh -  25px)"
    ></x-error-message>

    <!-- show error files -->
    <x-error-files v-show="!files_loading && !files_load_error"></x-error-files>
  </div>
</template>

<script>
import errorLogModule from "@/javascripts/instance/errors/ErrorLogIndex";
import xErrorFiles from "@/components/instance/errors/ErrorFiles";

export default {
  components: {
    "x-error-files": xErrorFiles
  },

  ...errorLogModule
};
</script>