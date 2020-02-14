<template>
  <div>
    <!-- header -->
    <x-header active="console"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider :active="menuTab" @menuChanged="menuChanged"></x-sider>

      <Content>
        <!-- loading -->
        <div v-show="appInfoLoading" class="spin-loading" style="margin-top:300px;">
          <Spin size="large"></Spin>
        </div>

        <transition v-for="(content, index) in contentGroup" :key="index" name="slide-dashboard">
          <!-- dashboard component -->
          <component
            v-show="!appInfoLoading && menuTab === content.value"
            :is="content.component"
            :appId="appId"
            :appName="appName"
            :currentUserIsOwner="currentUserIsOwner"
          ></component>
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
import xFile from "./file/Index";
import xTeam from "./team/Index";
import xAlarm from "./alarm/Index";
import xSetting from "./setting/Index";

const dashboardData = Object.assign(
  {
    components: {
      "x-header": xHeader,
      "x-sider": xSider,
      "x-instance": xInstance,
      "x-file": xFile,
      "x-team": xTeam,
      "x-alarm": xAlarm,
      "x-setting": xSetting
    },

    data() {
      return {
        appId: null,
        appName: "未知应用",
        currentUserIsOwner: false,
        appInfoLoading: false,
        menuTab: null,
        contentGroup: [
          { component: "x-instance", value: "instance" },
          { component: "x-file", value: "file" },
          { component: "x-team", value: "team" },
          { component: "x-alarm", value: "alarm" },
          { component: "x-setting", value: "setting" }
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