<template>
  <div>
    <!-- header -->
    <x-header active="console"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider :active="menuTab" @menuChanged="menuChanged"></x-sider>

      <Content>Content</Content>
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
        menuTab: null
      };
    }
  },
  dashboardModule
);

export default dashboardData;
</script>