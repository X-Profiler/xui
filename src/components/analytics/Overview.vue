<template>
  <div class="overview">
    <div v-for="(tab, index) in data" :key="index" class="group">
      <div class="label">{{ tab.lable }}</div>
      <div class="value">{{ tab.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
};
</script>

<style scoped>
.overview {
  display: flex;
  align-items: center;
}

.group {
  flex-basis: 500px;
  flex-grow: 1;
  text-align: center;
}
</style>