<template>
  <div>
    <div class="dropdown-list">
      {{ title }}
      <div class="dropdown-icon-rotate">
        <Icon class="dropdown-icon-translate" type="ios-arrow-down" />
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
.dropdown-list {
  text-align: center;
  cursor: pointer;
  display: flex;
}

.dropdown-list:hover .dropdown-icon-translate {
  transform: translateY(1px);
}

.dropdown-icon-rotate {
  margin-left: 3px;
}

.dropdown-list:hover .dropdown-icon-rotate {
  transform: rotate(180deg);
  transition: transform 0.1s ease-out;
}
</style>