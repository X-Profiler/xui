"use strict";

import * as utils from "@/javascripts/lib/utils";

export default {
  created() {
    const { rootIndex, retainedSizes } = this.profile;
    const totalRetainedSize = retainedSizes[rootIndex];
    this.leakNodes = this.profile
      .getSuspectedLeakNodes()
      .filter(node => node.size / totalRetainedSize > 0.1)
      .map(node => {
        node.percentage = Number((node.size / totalRetainedSize * 100).toFixed(2));
        node.formatedSize = utils.formatSize(node.size);

        if (node.count > 1) {
          return node;
        }

        node.address = this.profile.nodeUtils.getAddress(node.id);
        return node;
      });

  },

  methods: {
    getCardTitle(index) {
      return `可疑点 ${index + 1}`;
    },

    getIntervalStyle(index) {
      return index === 0 ? "" : "margin-top: 15px"
    }
  }
};