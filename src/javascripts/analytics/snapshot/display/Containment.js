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

    formatEdges(id, start = 0, interval = 50) {
      const { nodeUtils, edgeUtils } = this.profile;
      const edges = nodeUtils.getEdges(id);
      const lastIndex = Math.min(edges.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const edge = edges[index];
        const targetNode = edgeUtils.getTargetNode(edge, true);
        children.push({
          id: targetNode,
          title: this.formatNode(targetNode),
        });
      }
      return { children, lastIndex, more: lastIndex < edges.length };
    },

    initTree() {
      const { rootIndex } = this.profile;
      const rootInfo = this.formatNode(rootIndex);
      const { children, lastIndex, more } = this.formatEdges(rootIndex);

      this.profileTreeData = [{
        id: rootIndex,
        title: rootInfo,
        expand: true,
        children, lastIndex, more
      }];
    },

    expandNode(tree) {
      if (!tree.expand) {
        tree.children = null;
      }

      const { children, lastIndex, more } = this.formatEdges(tree.id);
      if (!tree.children) {
        this.$set(tree, "children", children);
        this.$set(tree, "lastIndex", lastIndex);
        this.$set(tree, "more", more);
      }
    }
  },
};