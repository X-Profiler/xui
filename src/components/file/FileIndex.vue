<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line>
      <x-uploader slot="extra"></x-uploader>
    </x-dashboard-title>

    <!-- file type filter -->
    <x-type-filter class="type-filter"></x-type-filter>

    <!-- file list -->
    <x-file-list class="file-list"></x-file-list>

    <!-- analytics page wrapper -->
    <x-analytics></x-analytics>
  </div>
</template>

<script>
import fileModule from "@/javascripts/file/FileIndex";
import xUploader from "@/components/file/upload/Uploader";
import xTypeFilter from "@/components/file/TypeFilter";
import xFileList from "@/components/file/list/FileList";
import xAnalytics from "@/components/file/Analytics";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-uploader": xUploader,
    "x-type-filter": xTypeFilter,
    "x-file-list": xFileList,
    "x-analytics": xAnalytics
  },

  ...fileModule
};
</script>

<style scoped>
.type-filter {
  margin-top: 15px;
  text-align: left;
}

.file-list {
  margin-top: 10px;
}
</style>
