"use strict";

import treeHelper from "@/javascripts/analytics/snapshot/display/TreeHelper";

const { methods: treeMethods } = treeHelper;

export default {
  created() {
    this.initTree();
  },

  methods: {
    initTree() {
      const { rootIndex } = this.profile;
      const { info: rootInfo, mark } = this.formatNode(rootIndex);
      const { children, lastIndex, more, left, noChild } = this.formatEdges(rootIndex);

      this.profileTreeData = [{
        id: rootIndex,
        title: rootInfo,
        expand: true,
        children, lastIndex, more,
        left, noChild,
        parents: [rootIndex],
        mark
      }];
    },

    formatEdges(id, start = 0, parents = [], parentMark, interval = 50) {
      const { nodeUtils, edgeUtils, retainedSizes } = this.profile;
      const edges = nodeUtils.getSortedEdges(id);
      const lastIndex = Math.min(edges.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const edge = edges[index];
        const targetNode = edgeUtils.getTargetNode(edge, true);
        const { info: title, mark } = this.formatNode(targetNode, edge, parents, {
          parentRetainedSize: retainedSizes[id] - nodeUtils.getSelfSize(id),
          parentChilds: edges.length,
          parentMark
        });
        children.push({
          id: targetNode,
          title,
          parents: [targetNode].concat(parents),
          disabled: parents.includes(targetNode),
          mark
        });
      }
      return { children, lastIndex, more: lastIndex < edges.length, left: edges.length - lastIndex, noChild: !edges.length };
    },

    ...treeMethods
  },
};