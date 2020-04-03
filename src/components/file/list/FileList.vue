<template>
  <div>
    <!-- loading -->
    <x-loading :loading="files_loading" type="dot" size="small" top="30vh"></x-loading>

    <!-- error -->
    <x-error-message v-show="files_load_error" :message="files_load_error" top="calc(30vh -  25px)"></x-error-message>

    <!-- file list -->
    <x-content v-if="filterType"></x-content>
  </div>
</template>

<script>
import fileListModule from "@/javascripts/file/list/FileList";
import xContent from "@/components/file/list/Content";

export default {
  components: {
    "x-content": xContent
  },

  ...fileListModule
};
</script>