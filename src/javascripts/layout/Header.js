'use strict';

import { http } from "../lib/Config";
import * as utils from "../lib/Utils";

export default {
  created() {
    // set common http methods
    this.get = utils.get.bind(this);

    // init active nav
    for (const nav of this.navActions) {
      if (nav.value === this.active) {
        nav.active = true;
      }
    }

    // get user info
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      this.get(http.user.msg, http.user.url, {}, data => {
        this.user.name = data.name || 'Unknown';
      });
    },

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