<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line></x-dashboard-title>

    <!-- loading -->
    <x-loading :loading="settings_loading" type="dot" size="middle" top="calc(40vh - 45px)"></x-loading>

    <!-- error -->
    <x-error-message
      v-show="settings_load_error"
      :message="settings_load_error"
      top="calc(40vh -  70px)"
    ></x-error-message>

    <!-- show settings -->
    <x-settings-content v-if="!settings_loading && !settings_load_error"></x-settings-content>

    <!-- modify app name -->
    <x-modal ref="modify" title="修改应用名称" :padding="0" @canceled="closeModifyModal" hide-footer>
      <x-name-modify slot="content"></x-name-modify>
    </x-modal>
  </div>
</template>

<script>
import settingsModule from "@/javascripts/setting/SettingsIndex";
import xSettingsContent from "@/components/setting/SettingsContent";
import xNameModify from "@/components/setting/NameModify";

export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },

  components: {
    "x-settings-content": xSettingsContent,
    "x-name-modify": xNameModify
  },

  data() {
    return {
      modalModify: "name-modify"
    };
  },

  ...settingsModule
};
</script>
