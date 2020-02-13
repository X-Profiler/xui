<template>
  <div>
    <!-- header -->
    <x-header active="console"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider :active="menuTab" @menuChanged="menuChanged"></x-sider>

      <Content>
        <transition v-for="(content, index) in contentGroup" :key="index" name="slide-dashboard">
          <component v-show="menuTab === content.value" :is="content.component"></component>
        </transition>
      </Content>
    </div>
  </div>
</template>

<script>
import xHeader from "./layout/Header";
import xSider from "./layout/Sider";
import dashboardModule from "../javascripts/Dashboard";

// menu components
import xInstance from "./instance/Index";

const dashboardData = Object.assign(
  {
    components: {
      "x-header": xHeader,
      "x-sider": xSider,
      "x-instance": xInstance
    },

    data() {
      return {
        appId: null,
        menuTab: null,
        contentGroup: [
          { component: "x-instance", value: "instance" },
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