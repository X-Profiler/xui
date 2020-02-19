"use strict";

export default {
  created() {
    this.activeMenuGroup(this.active);
  },

  methods: {
    activeMenuGroup(activeMenu) {
      for (const menu of this.menuGroup) {
        if (menu.value === activeMenu) {
          menu.active = true;
        }
      }
    },

    resetMenuGroup() {
      for (const menu of this.menuGroup) {
        menu.active = false;
      }
    },

    changeMenu(menu) {
      if (menu === this.active) {
        return;
      }
      this.$emit("menuChanged", menu);
    },

    checkAuth(menu) {
      return menu.value !== "setting" || this.owner;
    }
  },

  watch: {
    active() {
      this.resetMenuGroup();
      this.activeMenuGroup(this.active);
    }
  }
};