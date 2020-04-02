<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line>
      <x-uploader slot="extra"></x-uploader>
    </x-dashboard-title>

    <!-- file type filter -->
    <x-type-filter class="type-filter"></x-type-filter>
  </div>
</template>

<script>
import fileModule from "@/javascripts/file/FileIndex";
import xUploader from "@/components/file/upload/Uploader";
import xTypeFilter from "@/components/file/TypeFilter";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-uploader": xUploader,
    "x-type-filter": xTypeFilter
  },

  ...fileModule
};
</script>

<style scoped>
.type-filter {
  margin-top: 15px;
  text-align: left;
}
</style>
