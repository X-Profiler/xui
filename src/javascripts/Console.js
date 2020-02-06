'use strict';

import { tags } from "./lib/Config";
import * as utils from "./lib/Utils";

export default {
  computed: {
    myApps() {
      return utils.getTag(tags.myApps);
    },

    joinedApps() {
      return utils.getTag(tags.joinedApps);
    }
  }
};