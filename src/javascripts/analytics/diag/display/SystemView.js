"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics");

export default {
  computed: {
    ...mapState(["file_data"]),

    osVersion() {
      return this.file_data.osVersion;
    },

    system() {
      return this.file_data.system || {};
    },

    systemEnv() {
      const env = this.system.env || [];

      return env.map(e => {
        const tmp = e.split("=");
        return {
          key: tmp[0],
          value: tmp[1]
        };
      });
    },

    resourceLimits() {
      const resourceLimits = this.system.resourceLimits || [];
      return resourceLimits;
    },

    loadedLibraries() {
      const loadedLibraries = this.system.loadedLibraries || [];
      return loadedLibraries;
    }
  }
};