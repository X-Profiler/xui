"use strict";

import { http } from "../config";
import * as utils from "../lib/utils";

const cache = { user: { name: "" } };

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    // init active nav
    for (const nav of this.navActions) {
      if (nav.value === this.active) {
        nav.active = true;
      }
    }

    // get user info
    if (cache.user.name) {
      this.user.name = cache.user.name;
    } else {
      this.getUserInfo();
    }
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    getUserInfo() {
      this.get(http.user.msg, http.user.url, {}, data => {
        this.user.name = data.name || "Unknown";
      }, this.cancelToken.token);
    },

    resetActiveNav() {
      for (const nav of this.navActions) {
        nav.active = false;
      }
    },

    activeNav(index) {
      const nav = this.navActions[index];
      if (nav) {
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
  },

  watch: {
    "user.name": function () {
      cache.user.name = this.user.name;
    }
  }
};