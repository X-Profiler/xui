"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/file/wrapper");
const { mapMethods: mapMethodsDiag, mapWatch: mapWatchDiag, handleMounted: handleMountedDiag } =
  utils.drawerRouteFactory("diagDrawerKey", "diagDrawer", "diag", "setDiagDrawer", "diagData");
const { mapMethods: mapMethodsGc, mapWatch: mapWatchGc, handleMounted: handleMountedGc } =
  utils.drawerRouteFactory("gcDrawerKey", "gcDrawer", "gc", "setGcDrawer", "gcData");
const { mapMethods: mapMethodsTrend, mapWatch: mapWatchTrend, handleMounted: handleMountedTrend } =
  utils.drawerRouteFactory("trendDrawerKey", "trendDrawer", "trend", "setTrendDrawer", "trendData");
const { mapMethods: mapMethodsFlamegraph, mapWatch: mapWatchFlamegraph, handleMounted: handleMountedFlamegraph } =
  utils.drawerRouteFactory("flamegraphDrawerKey", "flamegraphDrawer", "flamegraph", "setFlamegraphDrawer", "flamegraphData");

export default {
  mounted() {
    handleMountedDiag.call(this, "handleDiagDrawer", true);
    handleMountedGc.call(this, "handleGcDrawer", true);
    handleMountedTrend.call(this, "handleTrendDrawer", true);
    handleMountedFlamegraph.call(this, "handleFlamegraphDrawer", true);
  },

  methods: {
    ...mapMutations(["setDiagDrawer", "setGcDrawer", "setTrendDrawer", "setFlamegraphDrawer"]),

    ...mapMethodsDiag("handleDiagDrawer"),

    ...mapMethodsGc("handleGcDrawer"),

    ...mapMethodsTrend("handleTrendDrawer"),

    ...mapMethodsFlamegraph("handleFlamegraphDrawer"),

    closeDiagDrawer() {
      this.setDiagDrawer({ status: false });
    },

    closeGcDrawer() {
      this.setGcDrawer({ status: false });
    },

    closeTrendDrawer() {
      this.setTrendDrawer({ status: false });
    },

    closeFlameGraphDrawer() {
      this.setFlamegraphDrawer({ status: false });
    }
  },

  computed: {
    ...mapState([
      "diagDrawer", "diagData",
      "gcDrawer", "gcData",
      "trendDrawer", "trendData",
      "flamegraphDrawer", "flamegraphData"
    ])
  },

  watch: {
    ...mapWatchDiag,

    ...mapWatchGc,

    ...mapWatchTrend,

    ...mapWatchFlamegraph,

    $route(to) {
      this.handleDiagDrawer(to.query);
      this.handleGcDrawer(to.query);
      this.handleTrendDrawer(to.query);
      this.handleFlamegraphDrawer(to.query);
    }
  }
};