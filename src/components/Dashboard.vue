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
            :title="content.title"
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
import { tags } from "../javascripts/lib/Config";
import { getTag } from "../javascripts/lib/Utils";

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
        appName: getTag(tags.nameUnknown),
        currentUserIsOwner: false,
        appInfoLoading: false,
        menuTab: null,
        contentGroup: [
          {
            component: "x-instance",
            value: "instance",
            title: getTag(tags.instanceTitle)
          },
          {
            component: "x-file",
            value: "file",
            title: getTag(tags.fileTitle)
          },
          { component: "x-team", value: "team", title: getTag(tags.teamTitle) },
          {
            component: "x-alarm",
            value: "alarm",
            title: getTag(tags.alarmTitle)
          },
          {
            component: "x-setting",
            value: "setting",
            title: getTag(tags.settingTitle)
          }
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