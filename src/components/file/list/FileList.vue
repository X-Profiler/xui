<template>
  <div>
    <!-- loading -->
    <x-loading :loading="files_loading" type="dot" size="middle" top="30vh"></x-loading>

    <!-- error -->
    <x-error-message v-show="files_load_error" :message="files_load_error" top="calc(30vh -  25px)"></x-error-message>

    <!-- file list -->
    <x-content v-if="filterType"></x-content>

    <!-- show action error -->
    <x-modal
      ref="actionError"
      :title="errorModalData.title"
      :padding="0"
      @canceled="closeErrorModal"
      hide-footer
    >
      <x-operation-error slot="content"></x-operation-error>
    </x-modal>
  </div>
</template>

<script>
import fileListModule from "@/javascripts/file/list/FileList";
import xContent from "@/components/file/list/Content";
import xOperationError from "@/components/file/list/OperationError";

export default {
  components: {
    "x-content": xContent,
    "x-operation-error": xOperationError
  },

  data() {
    return {
      modalQueryKey: "operation-error"
    };
  },

  ...fileListModule
};
</script>