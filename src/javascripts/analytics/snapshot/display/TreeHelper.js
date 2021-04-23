"use strict";

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
  }
};