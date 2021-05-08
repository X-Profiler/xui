"use strict";

import treeHelper from "@/javascripts/analytics/snapshot/display/TreeHelper";

const { methods: treeMethods } = treeHelper;

export default {
  created() {
    this.initTree();
  },

  methods: {
    initTree() {
      const rootId = this.rootId;
      let { rootIndex } = this.profile;
      rootIndex = rootId === -1 ? rootIndex : rootId;

      const { info: rootInfo, mark } = this.formatNode(rootIndex);
      const { children, lastIndex, more, left, noChild } = this.formatEdges(rootIndex, 0, [rootIndex]);

      this.profileTreeData = {
        list: [{
          id: rootIndex,
          title: rootInfo,
          expand: true,
          children, lastIndex, more,
          left, noChild,
          parents: [rootIndex],
          mark
        }]
      };
    },

    formatEdges(id, start = 0, parents = [], parentMark, interval = 50) {
      const retainers = this.profile.getRetainers(id);
      const lastIndex = Math.min(retainers.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const retainer = retainers[index];
        const targetNode = retainer.ordinal;
        const { info: title, mark } = this.formatNode(targetNode, retainer.edge, parents);
        children.push({
          id: targetNode,
          title,
          parents: [targetNode].concat(parents),
          disabled: parents.includes(targetNode),
          mark
        });
      }
      return { children, lastIndex, more: lastIndex < retainers.length, left: retainers.length - lastIndex, noChild: !retainers.length };
    },

    ...treeMethods
  },

  watch: {
    rootId() {
      this.initTree();
    }
  }
};