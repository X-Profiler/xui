"use strict";

import treeHelper from "@/javascripts/analytics/snapshot/display/TreeHelper";

const { methods: treeMethods } = treeHelper;
const dominatorMap = {};

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
      const childs = this.getSortedDominators(id);
      const lastIndex = Math.min(childs.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const targetNode = childs[index];
        children.push({
          id: targetNode,
          title: this.formatNode(targetNode, null, parents),
          parents: [targetNode].concat(parents),
          disabled: parents.includes(targetNode),
        });
      }
      return { children, lastIndex, more: lastIndex < childs.length, left: childs.length - lastIndex, noChild: !childs.length };
    },

    getSortedDominators(id) {
      if (dominatorMap[id]) {
        return dominatorMap[id];
      }

      const { dominators, retainedSizes } = this.profile;
      const doms = dominators[id] || [];
      doms.sort((o, n) => retainedSizes[o] < retainedSizes[n] ? 1 : -1);
      dominatorMap[id] = doms;

      return doms;
    },

    ...treeMethods
  },
};