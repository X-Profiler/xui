"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics");

export default {
  computed: {
    ...mapState(["file_data"]),

    nativeStacks() {
      const { nativeStacks } = this.file_data;

      return nativeStacks.map(frame => {
        const { pcAddress, symbolName, sharedObjectName } = frame;
        let frameDetail = '';
        if (!symbolName && !sharedObjectName) {
          frameDetail = '<unknown frame>'
        } else {
          frameDetail = `${symbolName || ""}${sharedObjectName ? ` [${sharedObjectName}]` : ''}`;
        }

        return {
          pcAddress,
          frameDetail
        }
      });
    }
  }
};