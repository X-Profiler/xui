<template>
  <div>
    <Header class="header" :style="headerStyle">
      <a href="https://github.com/hyj1991/easy-monitor" target="_blank" class="logo">
        <!-- <router-link class="logo" :to="{path:`/`}"> -->
        <Icon class="icon" type="md-desktop" />EZM 3.0
        <!-- </router-link> -->
      </a>
      <span
        v-for="(nav, index) in navActions"
        :class="'nav-selection' + (nav.active ? ' active' :'')"
        :style="'text-align: center;' + (nav.value !== 'docs' ? 'min-width: 100px;' : '')"
        :key="index"
        @click="activeNav(nav)"
        @mouseover="mouseover(nav)"
        @mouseout="mouseout(nav)"
      >
        <span v-if="nav.label !== 'user'">{{ nav.label }}</span>
        <x-dropdown
          :fontSize="14"
          :paddingBottom="0"
          :rawTop="35"
          :minWidth="120"
          :contentTop="10"
          :contentBottom="10"
          not-show-arrow
          v-else
          class="panel-title-dropdown"
          :title="user.name"
        >
          <template slot="content"
            ><div
              v-for="(info, index) in showInfo"
              :key="index"
              class="show-info x-dropdown-li"
            >
              <div class="info-key">{{ info.key }}</div>
              <div class="info-split"></div>
              <div class="info-value">{{ info.value }}</div>
            </div></template
          >
        </x-dropdown>
      </span>
    </Header>
  </div>
</template>

<script>
import headerModule from "@/javascripts/layout/Header";
import { tags } from "@/javascripts/config";
import { getTag } from "@/javascripts/lib/utils";

export default {
  props: {
    active: String,
    owner: Boolean,
    color: String
  },

  data() {
    return {
      user: {
        name: "",
        id: null,
      },
      navActions: [
        { active: false, label: getTag(tags.docs), value: "docs", href: "" },
        { active: false, label: getTag(tags.console), value: "console" },
        // { active: false, label: getTag(tags.lang), value: "lang" },
        { active: false, label: "user", value: "user", href: "" }
      ]
    };
  },

  ...headerModule
};
</script>

<style scoped>
.header {
  text-align: right;
}

.logo {
  position: absolute;
  left: 20px;
  cursor: pointer;
  color: white;
}

.icon {
  font-size: 15px;
  margin-right: 10px;
}

.nav-selection {
  display: inline-block;
  padding-left: 25px;
  padding-right: 25px;
  cursor: pointer;
  user-select: none;
  color: white;
  transition: background-color 0.2s ease-out;
}

.nav-selection.active {
  background-color: #0f1423;
}

.show-info {
  font-family: Avenir, Helvetica, Arial, sans-serifoptional;
  font-size: 13px;
  line-height: 30px;
  padding: 0px 15px;
  user-select: text;
  display: flex;
  cursor: default;
}

.info-split {
  border-right: 1px solid #e8eaec;
  width: 1px;
  height: 20px;
  margin: 0 7px;
}
</style>