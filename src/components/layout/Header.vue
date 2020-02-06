<style scoped>
.header {
  text-align: right;
}

.nav-selection {
  color: white;
  display: inline-block;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
  user-select: none;
}

.nav-selection.active {
  background-color: #0f0e0e;
}
</style>

<template>
  <div>
    <Header class="header">
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
          { active: false, label: "使用指南", value: "docs", href: "" },
          { active: false, label: "控制台", value: "console" },
          { active: false, label: "user", value: "user", href: "" }
        ]
      };
    }
  },
  headerModule
);

export default headerData;
</script>