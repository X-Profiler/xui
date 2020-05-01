"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/alarm");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalTip", "tipModal", "tip", "setTipModal");
const { mapMethods: mapMethodsContacts, mapWatch: mapWatchContacts, handleMounted: handleMountedContacts } =
  utils.modalRouteFactory("modalContacts", "contactsModal", "contacts", "setContactsModal");

export default {
  mounted() {
    handleMounted.call(this, "handleTipModal");
    handleMountedContacts.call(this, "handleContactsModal");
  },

  beforeDestroy() {
    this.resetState();
  },

  methods: {
    ...mapMutations(["resetState", "setTipModal", "setContactsModal"]),

    ...mapMethods("handleTipModal"),

    ...mapMethodsContacts("handleContactsModal"),

    closeTipModal() {
      this.setTipModal({ status: false });
    },

    closeContactsModal() {
      this.setContactsModal({ status: false });
    }
  },

  computed: {
    ...mapState(["tipModal", "tipData", "contactsModal"])
  },

  watch: {
    ...mapWatch,

    ...mapWatchContacts,

    $route(to) {
      this.handleTipModal(to.query);
      this.handleContactsModal(to.query);
    }
  }
};