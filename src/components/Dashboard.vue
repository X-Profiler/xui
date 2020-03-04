<template>
  <div>
    <!-- header -->
    <x-header active="console" :owner="currentUserIsOwner"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider :active="menuTab" :owner="currentUserIsOwner" @menuChanged="menuChanged"></x-sider>

      <Content>
        <!-- loading -->
        <x-loading :loading="appInfoLoading" :top="300" type="dot"></x-loading>

        <transition name="slide">
          <!-- dashboard component -->
          <component
            v-if="!appInfoLoading && activeContent"
            :is="activeContent.component"
            :appId="appId"
            :appName="appName"
            :title="activeContent.title"
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
import { tags } from "../javascripts/config";
import { getTag } from "../javascripts/lib/utils";

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
        activeContent: {},
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