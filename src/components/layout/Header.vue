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
export default {
  props: {
    active: String
  },
  created() {
    for (const nav of this.navActions) {
      if (nav.value === this.active) {
        nav.active = true;
      }
    }
  },
  data() {
    return {
      user: {
        name: "hyj1991"
      },
      navActions: [
        { active: false, label: "使用指南", value: "docs", href: "" },
        { active: false, label: "控制台", value: "console" },
        { active: false, label: "user", value: "user", href: "" }
      ]
    };
  },
  methods: {
    resetActiveNav() {
      for (const nav of this.navActions) {
        nav.active = false;
      }
    },
    activeNav(index) {
      const nav = this.navActions[index];
      if (nav && !nav.active) {
        if (["console"].includes(nav.value)) {
          this.resetActiveNav();
          nav.active = true;
          const target = `/${nav.value}`;
          if (this.$route.path !== target) this.$router.push({ path: target });
        } else if (nav.href) {
          const { href } = this.$router.resolve({ path: nav.href });
          window.open(href, "_blank");
        }
      }
    }
  }
};
</script>