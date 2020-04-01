<template>
  <div>
    <div class="detail-title">
      <div class="detail-app-name">{{ appName }}</div>
      <div class="detail-app-seg">
        <Icon type="ios-arrow-forward" />
      </div>
      <div>{{ dashboardTitle }}</div>

      <!-- extra slot -->
      <slot name="extra"></slot>
    </div>

    <!-- line -->
    <div v-if="line" class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    appName: String,
    dashboardTitle: String,
    line: Boolean
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

.line {
  height: 15px;
  border-bottom: 1px solid #dcdee2;
}
</style>