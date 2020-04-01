<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line>
      <x-upload slot="extra"></x-upload>
    </x-dashboard-title>
  </div>
</template>

<script>
import fileModule from "@/javascripts/file/FileIndex";
import xUpload from "@/components/file/Upload";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-upload": xUpload
  },

  ...fileModule
};
</script>
