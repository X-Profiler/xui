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
      const { children, lastIndex, more, left, noChild } = this.formatEdges(rootIndex, 0, [rootIndex]);

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
      const { nodeUtils, retainedSizes } = this.profile;
      const childs = this.profile.getSortedDominators(id);
      const lastIndex = Math.min(childs.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const targetNode = childs[index];
        const edge = this.profile.getEdgeByParentAndChild(id, targetNode);
        const { info: title, mark } = this.formatNode(targetNode,
          edge === -1 ? null : edge, parents, {
          parentRetainedSize: retainedSizes[id] - nodeUtils.getSelfSize(id),
          parentChilds: childs.length,
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
      return { children, lastIndex, more: lastIndex < childs.length, left: childs.length - lastIndex, noChild: !childs.length };
    },

    ...treeMethods
  },
};