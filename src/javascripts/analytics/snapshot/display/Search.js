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

    illegalId(id) {
      return utils.isNumber(id);
    },

    searchAddressOrId() {
      const addressOrId = this.addressOrId;
      if (this.illegalAddress(addressOrId)) {
        const id = this.profile.searchOrdinalByAddress(addressOrId.slice(1));
        if (utils.isNumber(id)) {
          this.rootId = Number(id);
        }
        return;
      }

      if (this.illegalId(addressOrId)) {
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