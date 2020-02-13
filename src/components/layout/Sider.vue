<template>
  <div>
    <Sider :width="60" class="sider">
      <div
        v-for="(menu, index) in menuGroup"
        :key="index"
        :class="'menu' + (menu.active ? ' active':'')"
        @click="changeMenu(menu.value)"
      >
        <Icon :type="menu.icon" class="menu-icon" />
        <p class="menu-name">{{ menu.label }}</p>
      </div>
    </Sider>
  </div>
</template>

<script>
import siderModule from "../../javascripts/layout/Sider";

const siderData = Object.assign(
  {
    props: {
      active: String
    },
    data() {
      return {
        menuGroup: [
          {
            label: "实例",
            value: "instance",
            icon: "md-albums",
            active: false
          },
          { label: "文件", value: "file", icon: "ios-folder", active: false },
          { label: "团队", value: "team", icon: "md-people", active: false },
          { label: "告警", value: "alarm", icon: "ios-alarm", active: false },
          {
            label: "设置",
            value: "setting",
            icon: "md-settings",
            active: false
          }
        ]
      };
    }
  },
  siderModule
);

export default siderData;
</script>

<style scoped>
.sider {
  min-height: 100vh;
}

.menu {
  color: white;
  height: 70px;
  padding: 15px 0;
  cursor: pointer;
  user-select: none;
}

.menu-icon {
  font-size: 22px;
}

.menu-name {
  margin-top: 3px;
}

.active {
  background-color: #2376b7;
}
</style>