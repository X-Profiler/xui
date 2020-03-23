<template>
  <div>
    <Header class="header">
      <a href="https://github.com/hyj1991/easy-monitor" target="_blank" class="logo">
        <Icon class="icon" type="md-desktop" />EZM 3.0
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
        <span v-else>{{ user.name }}</span>
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
    owner: Boolean
  },

  data() {
    return {
      user: {
        name: ""
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
</style>