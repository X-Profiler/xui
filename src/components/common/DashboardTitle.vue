<template>
  <div class="detail-title">
    <div class="detail-app-name">{{ appName }}</div>
    <div class="detail-app-seg">
      <Icon type="ios-arrow-forward" />
    </div>
    <div>{{ dashboardTitle }}</div>

    <!-- extra slot -->
    <slot name="extra"></slot>
  </div>
</template>

<script>
export default {
  props: {
    appName: String,
    dashboardTitle: String
  }
};
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