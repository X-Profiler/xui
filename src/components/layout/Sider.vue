<template>
  <div>
    <Sider :width="55" class="sider">
      <div v-for="(menu, index) in menuGroup" :key="index" class="menu">
        <Icon :type="menu.icon" class="menu-icon" />
        <p class="menu-name">{{ menu.label }}</p>
      </div>
    </Sider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuGroup: [{ label: "实例", value: "instance", icon: "md-albums" }]
    };
  }
};
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