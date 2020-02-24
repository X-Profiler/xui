"use strict";

const menuFlag = "MAIN_FLAG";

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
      if (menu.value === this.active) {
        return;
      }
      menu[menuFlag] = true;
      this.$emit("menuChanged", menu.value);
    },

    checkAuth(menu) {
      return menu.value !== "setting" || this.owner;
    },

    mouseover(menu) {
      if (menu.active) {
        menu[menuFlag] = true;
      } else {
        menu.active = true;
      }
    },

    mouseout(menu) {
      if (menu[menuFlag]) {
        delete menu[menuFlag];
      } else {
        menu.active = false;
      }
    }
  },

  watch: {
    active() {
      this.resetMenuGroup();
      this.activeMenuGroup(this.active);
    }
  }
};