<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title"></x-dashboard-title>
  </div>
</template>

<script>
export default {
  props: {
    appId: Number,
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  }
};
</script>
