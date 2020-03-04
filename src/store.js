"use strict";

export default {
  state: {
    drawer: {
      show: false,
      data: {}
    }
  },

  mutations: {
    openDrawer(state, data) {
      // diable touchmove
      const mo = function (e) { e.preventDefault(); };
      document.body.style.overflow = "hidden";
      // document.body.style.poxition = "fixed";
      document.addEventListener("touchmove", mo, false);

      state.drawer.show = true;
      state.drawer.data = data;
    },

    closeDrawer(state) {
      // enable touchmove
      const mo = function (e) { e.preventDefault(); };
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", mo, false);

      state.drawer.show = false;
    }
  }
};