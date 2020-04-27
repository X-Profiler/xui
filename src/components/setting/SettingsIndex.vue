<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line></x-dashboard-title>
  </div>
</template>

<script>
export default {
  props: {
    appName: String,
    title: String,
    currentUserIsOwner: Boolean
  }
};
</script>
