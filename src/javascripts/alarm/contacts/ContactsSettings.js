"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/alarm");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.updateContacts();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setTipModal"]),

    ...mapActions(["removeContact", "addContact"]),

    formatList(array) {
      const list = array.map((item, index) => {
        const data = Object.assign({
          loading: false,
          index
        }, item);
        return data;
      });
      list.sort((o, n) => Number(o.userId) > Number(n.userId) ? 1 : -1);
      return list;
    },

    updateContacts() {
      const { contacts, remainMembers } = this.contacts_data;
      if (Array.isArray(contacts)) {
        this.contacts = this.formatList(contacts);
      }

      if (Array.isArray(remainMembers)) {
        this.remainMembers = this.formatList(remainMembers);
      }
    },

    doAction(row, func, title, cb) {
      row.loading = true;
      this[func](
        {
          cancelToken: this.cancelToken.token,
          data: {
            strategyId: this.contactsData.strategyId,
            userId: row.userId
          }
        })
        .then(() => cb())
        .catch(err => {
          const data = { title, error: err.message, loading: false };
          this.setTipModal({ status: true, data });
        })
        .then(() => row.loading = false);
    },

    remove(row) {
      this.doAction(row, "removeContact", "移除联系人", () => {
        this.contacts_data.contacts.splice(row.index, 1);
        const tmp = { userId: row.userId, userInfo: row.userInfo };
        this.contacts_data.remainMembers.push(tmp);
      });
    },

    add(row) {
      this.doAction(row, "addContact", "添加联系人", () => {
        this.contacts_data.remainMembers.splice(row.index, 1);
        const tmp = { userId: row.userId, userInfo: row.userInfo };
        this.contacts_data.contacts.push(tmp);
      });
    }
  },

  computed: {
    ...mapState(["contactsData", "contacts_data"])
  },

  watch: {
    "contacts_data.contacts": function () {
      this.updateContacts();
    },

    "contacts_data.remainMembers": function () {
      this.updateContacts();
    }
  }
};