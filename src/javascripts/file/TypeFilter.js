"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters, mapMutations } = utils.createNamespace("dashboard/file");

export default {
  created() {
    const query = this.$route.query;
    if (query.filterType) {
      this.selectedFilterType = query.filterType;
    } else {
      this.selectedFilterType = "all";
    }
  },

  beforeDestroy() {
    this.setFilterType(undefined);
  },

  methods: {
    ...mapMutations(["setFilterType"])
  },

  computed: {
    ...mapState(["nessaryQueryArgs", "filterType"]),

    ...mapGetters(["filterTypes"])
  },

  watch: {
    filterType() {
      if (this.filterType) {
        this.selectedFilterType = this.filterType;
      }
    },

    $route(...args) {
      utils.watchRoute.call(this, args, "filterType", "selectedFilterType");
    },

    selectedFilterType(...args) {
      const [newValue, oldValue] = args;
      if (oldValue && newValue && oldValue !== newValue) {
        this.setFilterType(undefined);
      }
      setTimeout(() => this.setFilterType(this.selectedFilterType), 0);

      if (!this.selectedFilterType) {
        return;
      }

      utils.watchQueryKey.call(this, "filterType", "selectedFilterType", args);
    }
  }
};