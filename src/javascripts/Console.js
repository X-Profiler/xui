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