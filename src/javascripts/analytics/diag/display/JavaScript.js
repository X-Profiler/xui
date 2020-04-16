"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics");

export default {
  computed: {
    ...mapState(["file_data"]),

    jsStacks() {
      const { jsStacks } = this.file_data;

      return jsStacks.map(frame => {
        const { pcAddress, frameType,
          functionName, scriptName, lineNumber, column } = frame;
        const frameDetail = `${functionName}() (${scriptName}:${lineNumber}:${column})`;

        return {
          pcAddress,
          frameType,
          frameDetail
        };
      });
    }
  }
};