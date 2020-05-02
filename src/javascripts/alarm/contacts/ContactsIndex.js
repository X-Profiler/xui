"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/alarm");
const { mapState: mapStateContact, mapActions: mapActionsContact } = utils.createNamespace("dashboard/alarm/contact");

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

    ...mapActionsContact(["getContacts"]),

    closeContactsModal() {
      this.setContactsModal({ status: false });
    }
  },

  computed: {
    ...mapState(["contactsData"]),

    ...mapStateContact(["contacts_loading", "contacts_load_error"])
  }
};