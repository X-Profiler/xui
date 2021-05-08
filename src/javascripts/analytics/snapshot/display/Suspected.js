"use strict";

export default {
  created() {
    this.leakNodes = this.profile.getSuspectedLeakNodes();
  },
};