"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/file/wrapper");
const { mapMethods: mapMethodsDiag, mapWatch: mapWatchDiag, handleMounted: handleMountedDiag } =
  utils.drawerRouteFactory("diagDrawerKey", "diagDrawer", "diag", "setDiagDrawer", "diagData");
const { mapMethods: mapMethodsGc, mapWatch: mapWatchGc, handleMounted: handleMountedGc } =
  utils.drawerRouteFactory("gcDrawerKey", "gcDrawer", "gc", "setGcDrawer");

export default {
  mounted() {
    handleMountedDiag.call(this, "handleDiagDrawer", true);
    handleMountedGc.call(this, "handleGcDrawer", true);
  },

  methods: {
    ...mapMutations(["setDiagDrawer", "setGcDrawer"]),

    ...mapMethodsDiag("handleDiagDrawer"),

    ...mapMethodsGc("handleGcDrawer"),

    closeDiagDrawer() {
      this.setDiagDrawer({ status: false });
    },

    closeGcDrawer() {
      this.setGcDrawer({ status: false });
    }
  },

  computed: {
    ...mapState(["diagDrawer", "diagData", "gcDrawer"])
  },

  watch: {
    ...mapWatchDiag,

    ...mapWatchGc,

    $route(to) {
      this.handleDiagDrawer(to.query);
      this.handleGcDrawer(to.query);
    }
  }
};