<template>
  <div class="detail-content">
    <!-- title -->
    <div class="detail-title">
      <div class="detail-app-name">Xprofiler</div>
      <div class="detail-app-seg">
        <Icon type="ios-arrow-forward" />
      </div>
      <div>实例详情</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.detail-title {
  height: 25px;
  border-left: 6px solid #3c94d8;
  text-align: left;
  display: flex;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0 10px;
}

.detail-app-name {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.detail-app-seg {
  font-size: 17px;
  color: #808695;
}
</style>