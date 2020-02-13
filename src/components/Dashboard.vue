<template>
  <div>
    <!-- header -->
    <x-header active="console"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider :active="menuTab" @menuChanged="menuChanged"></x-sider>

      <Content>
        <transition v-for="(content, index) in contentGroup" :key="index" name="slide-dashboard">
          <div v-show="menuTab === content.value">{{ content.value }}</div>
        </transition>
      </Content>
    </div>
  </div>
</template>

<script>
import xHeader from "./layout/Header";
import xSider from "./layout/Sider";
import dashboardModule from "../javascripts/Dashboard";

const dashboardData = Object.assign(
  {
    components: {
      "x-header": xHeader,
      "x-sider": xSider
    },

    data() {
      return {
        appId: null,
        menuTab: null,
        contentGroup: [
          { component: "", value: "instance" },
          { component: "", value: "file" },
          { component: "", value: "team" },
          { component: "", value: "alarm" },
          { component: "", value: "setting" }
        ]
      };
    }
  },
  dashboardModule
);

export default dashboardData;
</script>

<style scoped>
.slide-dashboard-enter-active {
  transition: all 0.3s ease;
}
.slide-dashboard-leave {
  display: none;
}
.slide-dashboard-enter {
  transform: translateX(-5px);
  opacity: 0;
}
</style>