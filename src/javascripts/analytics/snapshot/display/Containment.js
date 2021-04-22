"use strict";

import * as utils from "@/javascripts/lib/utils";

export default {
  created() {
    this.initTree();
  },

  methods: {
    formatNode(id, edge, parents) {
      const { nodeUtils, edgeUtils, retainedSizes, gcrootsMap, NodeUtils, EdgeUtils } = this.profile;

      // node info
      const { KCLOSURE, KSTRING, KCONCATENATED_STRING, KSLICED_STRING } = NodeUtils.NodeTypes;
      const address = `<span class="snap-addr">@${nodeUtils.getAddress(id)}</span>`;
      const type = nodeUtils.getType(id);
      const nodeType = nodeUtils.getTypeForInt(id);
      const size = retainedSizes[id];
      let name = nodeUtils.getName(id);
      if (nodeType === KCONCATENATED_STRING) {
        name = nodeUtils.getConsStringName(id);
      }
      if (typeof name === "string" && name.length > 100) {
        name = name.substr(0, 100);
      }

      let nameClass = ["snap-name"];
      if ([KCLOSURE].includes(nodeType)) {
        name = `${name || "anonymous"}()`;
        nameClass.push("snap-closure");
      }
      if ([KSTRING, KSLICED_STRING, KCONCATENATED_STRING].includes(nodeType)) {
        nameClass.push("snap-string");
      }
      if (gcrootsMap[id] && name) {
        nameClass.push("snap-gcroot");
      }
      name = `<span class="${nameClass.join(" ")}">${name}</span>`;
      let info = `${name} ${address} <span class="snap-detial">(type: ${type}, size: ${utils.formatSize(size, 2, false, false, ' ')})</span>`;

      // edge info
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

      if (parents && parents.includes(id)) {
        info = `<span class="snap-disabled">${info}</span>`;
      }

      return info;
    },

    formatEdges(id, start = 0, parents = [], interval = 50) {
      const { nodeUtils, edgeUtils } = this.profile;
      const edges = nodeUtils.getSortedEdges(id);
      const lastIndex = Math.min(edges.length, start + interval);
      const children = [];
      for (let index = start; index < lastIndex; index++) {
        const edge = edges[index];
        const targetNode = edgeUtils.getTargetNode(edge, true);
        children.push({
          id: targetNode,
          title: this.formatNode(targetNode, edge, parents),
          parents: [targetNode].concat(parents),
          disabled: parents.includes(targetNode),
        });
      }
      return { children, lastIndex, more: lastIndex < edges.length, left: edges.length - lastIndex, noChild: !edges.length };
    },

    initTree() {
      const { rootIndex } = this.profile;
      const rootInfo = this.formatNode(rootIndex);
      const { children, lastIndex, more, noChild } = this.formatEdges(rootIndex);

      this.profileTreeData = [{
        id: rootIndex,
        title: rootInfo,
        expand: true,
        children, lastIndex, more,
        noChild,
        parents: [rootIndex]
      }];
    },

    expandNode(tree) {
      if (!tree.expand) {
        return;
      }

      if (!tree.children) {
        this.$set(tree, "children", []);
      }

      const { children, lastIndex, left, more, noChild } = this.formatEdges(tree.id, tree.lastIndex, tree.parents);
      tree.children = tree.children.concat(children);
      this.$set(tree, "lastIndex", lastIndex);
      this.$set(tree, "more", more);
      this.$set(tree, "left", left);
      this.$set(tree, "noChild", noChild);
    }
  },
};