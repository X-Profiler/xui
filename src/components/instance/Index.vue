<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" dashboardTitle="实例信息"></x-dashboard-title>
  </div>
</template>

<script>
import dashboardTitle from "../common/DashboardTitle";

export default {
  props: {
    appId: Number,
    appName: String,
    currentUserIsOwner: Boolean
  },
  components: {
    "x-dashboard-title": dashboardTitle
  }
};
</script>
