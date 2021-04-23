"use strict";

import treeHelper from "@/javascripts/analytics/snapshot/display/TreeHelper";

const { methods: treeMethods } = treeHelper;

export default {
  created() {
    this.initTree();
  },

  methods: {
    initTree() {

    },

    ...treeMethods
  },
};