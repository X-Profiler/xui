"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics");
const { mapMutations: mapMutationsDiag } = utils.createNamespace("dashboard/analytics/diag");

export default {
  methods: {
    ...mapMutationsDiag(["setUvType"]),

    getStatistics(type) {
      const { libuvHandles } = this.file_data;

      let total = 0;
      let active = 0;
      let activeAndRef = 0;

      for (const handle of libuvHandles) {
        if (type !== "all" && handle.type !== type) {
          continue;
        }

        total++;
        if (handle.isActive) {
          active++;
        }
        if (handle.isActive && handle.hasRef) {
          activeAndRef++;
        }
      }

      return { total, active, activeAndRef };
    }
  },

  computed: {
    ...mapState(["file_data"]),

    uvTypes() {
      const { libuvHandles } = this.file_data;
      const types = Array.from(new Set(libuvHandles.map(handle => handle.type)))
        .map(type => ({ label: type, value: type }));

      const map = {};
      for (const handle of libuvHandles) {
        if (map[handle.type]) {
          map[handle.type]++;
        } else {
          map[handle.type] = 1;
        }
      }

      types.sort((o, n) => map[o.value] < map[n.value] ? 1 : -1);

      const query = this.$route.query;
      if (query.uvType) {
        this.selectedUvType = query.uvType;
      } else {
        this.selectedUvType = types[0].value;
      }

      return types;
    },

    statistics() {
      return this.getStatistics("all");
    },

    handleStatistics() {
      return this.getStatistics(this.selectedUvType);
    }
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "uvType", "selectedUvType");
    },

    selectedUvType(...args) {
      const [newValue, oldValue] = args;
      if (oldValue && newValue && oldValue !== newValue) {
        this.setUvType(undefined);
      }
      setTimeout(() => this.setUvType(this.selectedUvType), 0);

      if (!this.selectedUvType) {
        return;
      }

      utils.watchQueryKey.call(this, "uvType", "selectedUvType", args);
    }
  }
};