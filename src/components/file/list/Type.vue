<template>
  <div class="file-type">
    <div>
      <Icon class="type-icon" :type="row.typeIcon" />
    </div>
    <div class="type-label">{{ row.typeLabel }}</div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  }
};
</script>

<style scoped>
.file-type {
  text-align: center;
}

.type-icon {
  color: rgb(33, 150, 243);
  font-size: 14px;
  transform: scale(2.2);
  margin: 9px 0 12px 0;
}

.type-label {
  font-size: 12px;
  color: #373d41;
}
</style>