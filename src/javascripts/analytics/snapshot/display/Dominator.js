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
      const rootInfo = this.formatNode(rootIndex);
      const { children, lastIndex, more, left, noChild } = this.formatEdges(rootIndex);

      this.profileTreeData = [{
        id: rootIndex,
        title: rootInfo,
        expand: true,
        children, lastIndex, more,
        left, noChild,
        parents: [rootIndex]
      }];
    },

    formatEdges(id, start = 0, parents = [], interval = 50) {
      const childs = this.profile.getSortedDominators(id);
      const lastIndex = Math.min(childs.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const targetNode = childs[index];
        const edge = this.profile.getEdgeByParentAndChild(id, targetNode);
        children.push({
          id: targetNode,
          title: this.formatNode(targetNode, edge === -1 ? null : edge, parents),
          parents: [targetNode].concat(parents),
          disabled: parents.includes(targetNode),
        });
      }
      return { children, lastIndex, more: lastIndex < childs.length, left: childs.length - lastIndex, noChild: !childs.length };
    },

    ...treeMethods
  },
};