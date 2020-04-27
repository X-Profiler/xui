<template>
  <div class="detail-content">
    <!-- title -->
    <x-dashboard-title :appName="appName" :dashboardTitle="title" line></x-dashboard-title>

    <!-- message -->
    <Alert class="x-alert tip" type="info">
      <div class="alert-group">
        <Icon style="color: #2376b7;`" type="ios-alert-outline" />
        <div
          class="alert-desc"
        >您可以将应用授权给其它成员进行管理，团队成员可以查看完整的应用监控数据，也可以访问生成的性能分析文件，方便协作定位 Node.js 应用故障</div>
      </div>
    </Alert>
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

<style scoped>
.tip {
  margin-top: 15px;
}
</style>
