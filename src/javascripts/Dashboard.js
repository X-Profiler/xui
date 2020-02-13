'use strict';

export default {
  created() {
    this.appId = this.$route.params.appId;
    this.menuTab = this.$route.params.menuTab;
  },

  methods: {
    menuChanged(active) {
      this.menuTab = active;
      if (this.$route.params.menuTab !== active) {
        this.$router.push({ path: active });
      }
    }
  },

  watch: {
    $route(to) {
      if (to.params.menuTab !== this.menuTab) {
        this.menuTab = to.params.menuTab;
      }
    }
  }
};