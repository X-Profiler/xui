<template>
  <div>
    <div class="panel-title-pid-list">
      {{ title }}
      <div class="panel-title-pid-icon-rotate">
        <Icon class="panel-title-pid-icon-translate" type="ios-arrow-down" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style scoped>
.panel-title-pid-list {
  text-align: center;
  cursor: pointer;
  display: flex;
}

.panel-title-pid-list:hover .panel-title-pid-icon-translate {
  transform: translateY(1px);
}

.panel-title-pid-icon-rotate {
  margin-left: 3px;
}

.panel-title-pid-list:hover .panel-title-pid-icon-rotate {
  transform: rotate(180deg);
  transition: transform 0.1s ease-out;
}
</style>