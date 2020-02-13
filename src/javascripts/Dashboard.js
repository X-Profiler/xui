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
  }
};