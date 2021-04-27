"use strict";

import * as utils from "@/javascripts/lib/utils";

const SIZE_LIMIT = 0.2;

export default {
  methods: {
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
    },

    checkSizeHigh(retainedSize) {
      const { retainedSizes, rootIndex } = this.profile;
      const totalSize = retainedSizes[rootIndex];
      return totalSize && retainedSize / totalSize > SIZE_LIMIT;
    },

    formatNode(id, edge, parents, { parentRetainedSize, parentChilds } = { parentRetainedSize: 0, parentChilds: 0 }) {
      const { nodeUtils, edgeUtils, retainedSizes, gcrootsMap, NodeUtils, EdgeUtils } = this.profile;

      // node info
      const { KCLOSURE, KSTRING, KCONCATENATED_STRING, KSLICED_STRING } = NodeUtils.NodeTypes;
      const address = `<span class="snap-addr">@${nodeUtils.getAddress(id)}</span>`;
      const type = nodeUtils.getType(id);
      const nodeType = nodeUtils.getTypeForInt(id);
      // node name
      let name = utils.htmlEscape(nodeUtils.getName(id));
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
      // node size
      const retainedSize = retainedSizes[id];
      let size = `size: ${utils.formatSize(retainedSize, 2, false, false, " ")}`;
      if (this.checkSizeHigh(retainedSize)) {
        size = `<span class="snap-leak-high">${size}</span>`;
      } else if (parentChilds && (this.checkSizeHigh(parentRetainedSize)) &&
        retainedSize > (parentRetainedSize / parentChilds)) {
        size = `<span class="snap-leak-warn">${size}</span>`;
      }
      let info = `${name} ${address} <span class="snap-detial">(type: ${type}, ${size})</span>`;

      // edge info
      if (edge || edge === 0) {
        const nameOrIndex = utils.htmlEscape(edgeUtils.getNameOrIndex(edge, true));
        const type = edgeUtils.GetType(edge, true);
        const edgeType = edgeUtils.getTypeForInt(edge, true);
        const { KELEMENT, KPROPERTY, KSHORTCUT, KCONTEXTVARIABLE } = EdgeUtils.EdgeTypes;
        let prot = `<span class="snap-hidden">${nameOrIndex}</span>`;
        if ([KELEMENT, KPROPERTY, KSHORTCUT].includes(edgeType)) {
          prot = `<span class="snap-property">${nameOrIndex}</span>`;
        }
        if ([KCONTEXTVARIABLE].includes(edgeType)) {
          prot = `<span class="snap-context">${nameOrIndex}</span>`;
        }
        info = `<span title="${type}">${prot}</title> <span class="snap-quto">::</span> ${info}`;
      }

      // if disabled
      if (parents && parents.includes(id)) {
        info = `<span class="snap-disabled">${info}</span>`;
      }

      return info;
    },
  }
};