"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/alarm");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();

    const { strategyId } = this.contactsData;
    this.getContacts({ cancelToken: this.cancelToken.token, strategyId });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setContactsModal"]),

    ...mapActions(["getContacts"]),

    closeContactsModal() {
      this.setContactsModal({ status: false });
    }
  },

  computed: {
    ...mapState(["contacts_loading", "contacts_load_error", "contactsData"]),
  }
};