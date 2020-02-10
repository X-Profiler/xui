'use strict';

import { tags } from "./lib/Config";
import * as utils from "./lib/Utils";

export default {
  created() {
    // get type from query
    const query = this.$route.query;
    if (query.type) {
      this.selectedType = query.type;
    }
  },

  methods: {
    showNewAppCreation() {
      this.showNewAppCreationModal = true;
    },

    submitNewAppCreation() {
      const newAppName = this.newAppName;

      // check app name
      if (!newAppName) {
        utils.error.call(this, '应用名称不能为空！');
        return;
      }
      if (newAppName.length > 30) {
        utils.error.call(this, '应用名称不能超过 30 个字符！');
        return;
      }

      // submit
      this.newAppCreationLoading = true;
      setTimeout(() => {
        this.newAppCreationLoading = false;
        this.showNewAppCreationModal = false;
        this.newAppName = '';
      }, 1000);
    }
  },

  computed: {
    myApps() {
      return utils.getTag(tags.myApps);
    },

    joinedApps() {
      return utils.getTag(tags.joinedApps);
    }
  },

  watch: {
    selectedType() {
      if (this.$route.query.type === this.selectedType) {
        return;
      }

      // go to new tab
      this.$router.push({
        path: this.$route.path,
        query: { type: this.selectedType }
      });
    },

    $route(to) {
      if (to.query.type !== this.selectedType) {
        this.selectedType = to.query.type;
      }
    }
  }
};