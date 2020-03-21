<template>
  <div>
    <Sider :width="60" class="sider">
      <div
        v-for="(menu, index) in menuGroup"
        :key="index"
        :class="'menu' + (checkAuth(menu) && menu.active ? ' active':'')"
        @click="changeMenu(menu)"
        @mouseover="mouseover(menu)"
        @mouseout="mouseout(menu)"
      >
        <transition name="slide-noward">
          <div v-show="checkAuth(menu)">
            <Icon :type="menu.icon" class="menu-icon" />
            <p class="menu-name">{{ menu.label }}</p>
          </div>
        </transition>
      </div>
    </Sider>
  </div>
</template>

<script>
import siderModule from "../../javascripts/layout/Sider";
import { tags } from "../../javascripts/config";
import { getTag } from "../../javascripts/lib/utils";

export default {
  props: {
    active: String,
    owner: Boolean
  },

  data() {
    return {
      menuGroup: [
        {
          label: getTag(tags.instance),
          value: "instance",
          icon: "md-cloud",
          active: false
        },
        {
          label: getTag(tags.file),
          value: "file",
          icon: "md-folder",
          active: false
        },
        {
          label: getTag(tags.team),
          value: "team",
          icon: "md-people",
          active: false
        },
        {
          label: getTag(tags.alarm),
          value: "alarm",
          icon: "ios-alarm",
          active: false
        },
        {
          label: getTag(tags.settings),
          value: "setting",
          icon: "md-settings",
          active: false
        }
      ]
    };
  },

  ...siderModule
};
</script>

<style scoped>
.sider {
  min-height: calc(100vh - 50px);
  height: 100%;
}

.menu {
  color: white;
  height: 70px;
  padding: 15px 0;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease-out;
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