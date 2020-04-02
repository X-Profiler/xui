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
    ...mapState(["nessaryQueryArgs"]),

    ...mapGetters(["filterTypes"])
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "filterType", "selectedFilterType");
    },

    selectedFilterType(...args) {
      this.setFilterType(this.selectedFilterType);
      utils.watchQueryKey.call(this, "filterType", "selectedFilterType", args);
    }
  }
};