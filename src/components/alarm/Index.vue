<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title"></x-dashboard-title>
  </div>
</template>

<script>
import dashboardTitle from "../common/DashboardTitle";

export default {
  props: {
    appId: Number,
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  },
  components: {
    "x-dashboard-title": dashboardTitle
  }
};
</script>
