"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/alarm");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalTip", "tipModal", "tip", "setTipModal");
const { mapMethods: mapMethodsContacts, mapWatch: mapWatchContacts, handleMounted: handleMountedContacts } =
  utils.modalRouteFactory("modalContacts", "contactsModal", "contacts", "setContactsModal");
const { mapMethods: mapMethodsHistory, mapWatch: mapWatchHistory, handleMounted: handleMountedHistory } =
  utils.drawerRouteFactory("drawerHistory", "historyDrawer", "history", "setHistoryDrawer", "historyData");

export default {
  mounted() {
    handleMounted.call(this, "handleTipModal");
    handleMountedContacts.call(this, "handleContactsModal");
    handleMountedHistory.call(this, "handleHistoryDrawer", true);
  },

  beforeDestroy() {
    this.resetState();
  },

  methods: {
    ...mapMutations(["resetState", "setTipModal", "setContactsModal", "setHistoryDrawer"]),

    ...mapMethods("handleTipModal"),

    ...mapMethodsContacts("handleContactsModal"),

    ...mapMethodsHistory("handleHistoryDrawer"),

    closeTipModal() {
      this.setTipModal({ status: false });
    },

    closeContactsModal() {
      this.setContactsModal({ status: false });
    },

    closeHistoryDrawer() {
      this.setHistoryDrawer({ status: false });
    }
  },

  computed: {
    ...mapState(["tipModal", "tipData", "contactsModal", "historyDrawer", "historyData"])
  },

  watch: {
    ...mapWatch,

    ...mapWatchContacts,

    ...mapWatchHistory,

    $route(to) {
      this.handleTipModal(to.query);
      this.handleContactsModal(to.query);
      this.handleHistoryDrawer(to.query);
    }
  }
};