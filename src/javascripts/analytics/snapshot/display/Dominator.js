"use strict";

import * as utils from "@/javascripts/lib/utils";
import treeHelper from "@/javascripts/analytics/snapshot/display/TreeHelper";

const { methods: treeMethods } = treeHelper;

export default {
  created() {
    this.initTree();
  },

  methods: {
    initTree() {
      if (this.data.length) {
        this.profileTreeData = this.data;
        return;
      }

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
        mark,
        showHidden: false,
        hiddenInfo: ""
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
          mark,
          showHidden: false,
          hiddenInfo: "",
        });
      }
      return { children, lastIndex, more: lastIndex < childs.length, left: childs.length - lastIndex, noChild: !childs.length };
    },

    getHiddenInfo(parent, child) {
      const { count, size, percent } = this.profile.getDominatorsRepeat(parent, child);
      let hiddenInfo = "";
      if (count > 1) {
        let more = "";
        if (percent) {
          more = ` (${percent}%)`;
        }
        hiddenInfo = `<span class="snap-infohidden">重复 ${count} 次，占据 ${utils.formatSize(size, 2, false, false, " ")}${more}</span>`;
      }
      return hiddenInfo;
    },

    showExtra({ parent, child }) {
      if (!child.hiddenInfoSetted) {
        child.hiddenInfo = this.getHiddenInfo(parent, child.id);
        child.hiddenInfoSetted = true;
      }
      child.showHidden = true;
    },

    hiddenExtra({ child }) {
      child.showHidden = false;
    },

    ...treeMethods
  },
};