'use strict';

export default {
  created() {
    // init active menu
    for (const menu of this.menuGroup) {
      if (menu.value === this.active) {
        menu.active = true;
      }
    }
  }
};