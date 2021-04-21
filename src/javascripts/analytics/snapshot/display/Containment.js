"use strict";

import * as utils from "@/javascripts/lib/utils";

export default {
  created() {
    this.initTree();
  },

  methods: {
    formatNode(id, edge) {
      const { nodeUtils, edgeUtils, retainedSizes, EdgeUtils } = this.profile;
      const name = `<span class="snap-name">${nodeUtils.getName(id)}</span>`;
      const address = `<span class="snap-addr">@${nodeUtils.getAddress(id)}</span>`;
      const type = nodeUtils.getType(id);
      const size = retainedSizes[id];
      let info = `${name} ${address} <span class="snap-detial">(type: ${type}, size: ${utils.formatSize(size)})</span>`;

      if (edge || edge === 0) {
        const nameOrIndex = edgeUtils.getNameOrIndex(edge, true);
        const edgeType = edgeUtils.getTypeForInt(edge, true);
        const { KELEMENT, KPROPERTY, KSHORTCUT, KCONTEXTVARIABLE } = EdgeUtils.EdgeTypes;
        let prot = `<span class="snap-hidden">${nameOrIndex}</span>`;
        if ([KELEMENT, KPROPERTY, KSHORTCUT].includes(edgeType)) {
          prot = `<span class="snap-property">${nameOrIndex}</span>`;
        }
        if ([KCONTEXTVARIABLE].includes(edgeType)) {
          prot = `<span class="snap-context">${nameOrIndex}</span>`;
        }
        info = `${prot} <span class="snap-quto">::</span> ${info}`;
      }

      return info;
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
          title: this.formatNode(targetNode, edge),
        });
      }
      return { children, lastIndex, more: lastIndex < edges.length, left: edges.length - lastIndex };
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
        return;
      }

      if (!tree.children) {
        this.$set(tree, "children", []);
      }

      const { children, lastIndex, left, more } = this.formatEdges(tree.id, tree.lastIndex);
      tree.children = tree.children.concat(children);
      this.$set(tree, "lastIndex", lastIndex);
      this.$set(tree, "more", more);
      this.$set(tree, "left", left);
    }
  },
};