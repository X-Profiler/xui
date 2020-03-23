"use strict";

import * as utils from "../lib/utils";

const { mapState, mapActions } = utils.createNamespace("user");

const cache = { user: { name: "" } };
const menuFlag = "MAIN_FLAG";

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
      this.getUserInfo({ cancelToken: this.cancelToken.token });
    }
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["getUserInfo"]),

    resetActiveNav() {
      for (const nav of this.navActions) {
        nav.active = false;
      }
    },

    activeNav(nav) {
      if (["console"].includes(nav.value)) {
        this.resetActiveNav();
        nav.active = true;
        const target = `/${nav.value}`;
        if (this.$route.path !== target) {
          const query = {};
          // go to /console
          if (nav.value === "console") {
            if (this.owner) {
              query.type = "myApps";
            } else {
              query.type = "joinedApps";
            }
          }
          this.$router.push({ path: target, query });
        }
      } else if (nav.href) {
        const { href } = this.$router.resolve({ path: nav.href });
        window.open(href, "_blank");
      }
    },

    mouseover(nav) {
      if (nav.active) {
        nav[menuFlag] = true;
      } else {
        nav.active = true;
      }
    },

    mouseout(nav) {
      if (nav[menuFlag]) {
        delete nav[menuFlag];
      } else {
        nav.active = false;
      }
    }
  },

  computed: {
    ...mapState(["user_data"])
  },

  watch: {
    "user.name": function () {
      cache.user.name = this.user.name;
    },

    user_data() {
      const data = this.user_data || {};
      this.user.name = data.name || "Unknown";
    }
  }
};