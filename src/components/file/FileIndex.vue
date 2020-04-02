<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line>
      <x-uploader slot="extra"></x-uploader>
    </x-dashboard-title>
  </div>
</template>

<script>
import fileModule from "@/javascripts/file/FileIndex";
import xUploader from "@/components/file/upload/Uploader";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-uploader": xUploader
  },

  ...fileModule
};
</script>
