"use strict";

import * as utils from "@/javascripts/lib/utils";

export default {
  created() {
    this.initTree();
  },

  methods: {
    formatNode(id) {
      const { nodeUtils, retainedSizes } = this.profile;
      const name = nodeUtils.getName(id);
      const address = nodeUtils.getAddress(id);
      const type = nodeUtils.getType(id);
      const size = retainedSizes[id];
      return `${name} @${address} (type: ${type}, size: ${utils.formatSize(size)})`;
    },

    initTree() {
      const { nodeUtils, edgeUtils, rootIndex } = this.profile;
      const rootInfo = this.formatNode(rootIndex);

      this.profileTreeData = [{
        title: rootInfo,
        expand: true,
        children: nodeUtils.getEdges(rootIndex).map(edge => ({
          title: this.formatNode(edgeUtils.getTargetNode(edge, true)),
        }))
      }];
    }
  },
};