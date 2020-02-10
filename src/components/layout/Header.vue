<template>
  <div>
    <Header class="header">
      <a href="https://github.com/hyj1991/easy-monitor" target="_blank" class="logo">
        <Icon class="icon" type="md-desktop" />EZM 3.0
      </a>
      <span
        v-for="(nav, index) in navActions"
        :class="'nav-selection' + (nav.active ? ' active' :'')"
        :key="index"
        @click="activeNav(index)"
      >
        <span v-if="nav.label !== 'user'">{{ nav.label }}</span>
        <span v-else>{{ user.name }}</span>
      </span>
    </Header>
  </div>
</template>

<script>
import headerModule from "../../javascripts/layout/Header";
import { tags } from "../../javascripts/lib/Config";
import { getTag } from "../../javascripts/lib/Utils";

const headerData = Object.assign(
  {
    props: {
      active: String
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
    }
  },
  headerModule
);

export default headerData;
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
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
  user-select: none;
  color: white;
}

.nav-selection.active {
  background-color: #0f0e0e;
}
</style>