<template>
  <div>
    <Sider :width="55" class="sider">
      <div class="menu active">
        <Icon type="md-albums" class="menu-icon" />
        <p class="menu-name">实例</p>
      </div>
    </Sider>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sider {
  min-height: 100vh;
}

.menu {
  color: white;
  height: 70px;
  padding-top: 10px;
  cursor: pointer;
}

.menu-icon {
  font-size: 22px;
}

.menu-name {
  margin-top: 5px;
}

.active {
  background-color: #2376b7;
}
</style>