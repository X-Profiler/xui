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
  flex-grow: 1;
  flex-shrink: 0;
  text-align: center;
}

.label {
  font-weight: bold;
  font-size: 15px;
}

.value {
  margin-top: 5px;
  font-family: Avenir,Helvetica,Arial,sans-serif;
  font-size: 16px;
}
</style>