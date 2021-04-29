"use strict";

import * as utils from "@/javascripts/lib/utils";

export default {
  methods: {
    illegalAddress(addr) {
      return addr &&
        addr.startsWith("@") &&
        utils.isNumber(addr.slice(1)) &&
        Number(addr.slice(1)) % 2 === 1;
    },

    searchAddressOrId() {
      const addressOrId = this.addressOrId;
      if (this.illegalAddress(addressOrId)) {
        return;
      }

      if (utils.isNumber(addressOrId)) {
        this.rootId = Number(addressOrId);
        return;
      }

      this.$Message.error("地址或 ID 不合法");
    },

    clearInput() {
      this.addressOrId = null;
    }
  }
};