"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/modules");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getModule({ cancelToken: this.cancelToken.token });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_module_load_error(undefined);
  },

  methods: {
    ...mapMutations(["set_module_load_error"]),

    ...mapActions(["getModule"]),
  },

  computed: {
    ...mapState(["module_loading", "module_load_error", "module_data", "showDependencies"]),

    modules() {
      const modules = [];
      const showDependencies = this.showDependencies;
      let data = this.module_data || {};
      if (!data.dependencies || !data.devDependencies) {
        return modules;
      }
      const lock = data.lockModule || {};
      data = showDependencies ? data.dependencies : data.devDependencies;

      for (const [name, version] of Object.entries(data)) {
        modules.push({
          moduleName: name,
          packageVersion: version,
          packageLockVersion: lock[name] && lock[name].version || '-'
        });
      }

      return modules;
    }
  }
};