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
        node.type = this.profile.nodeUtils.getType(node.id);
        node.edgeCount = this.profile.nodeUtils.getEdgeCount(node.id);
        return node;
      });
  },

  methods: {
    getCardTitle(index) {
      return `可疑点 ${index + 1}`;
    },

    getIntervalStyle(index) {
      return index === 0 ? "" : "margin-top: 15px";
    },

    copyAddress(index) {
      const addressNode = this.$refs[`address-${index}`][0];
      if (!addressNode) {
        return;
      }
      const range = document.createRange();
      range.selectNode(addressNode);
      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      this.$Message.success("地址已复制");
    }
  }
};