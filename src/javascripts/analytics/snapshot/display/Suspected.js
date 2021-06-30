"use strict";

import * as utils from "@/javascripts/lib/utils";
import treeHelper from "@/javascripts/analytics/snapshot/display/TreeHelper";

const { methods: treeMethods } = treeHelper;

export default {
  created() {
    const { rootIndex, retainedSizes, leakNodes } = this.profile;
    const totalRetainedSize = retainedSizes[rootIndex];
    this.leakNodes = leakNodes
      .map(node => {
        node.percentage = Number((node.size / totalRetainedSize * 100).toFixed(2));
        node.formatedSize = utils.formatSize(node.size);

        if (node.count > 1) {
          return node;
        }

        node.address = this.profile.nodeUtils.getAddress(node.id);
        node.type = this.profile.nodeUtils.getType(node.id);
        node.edgeCount = this.profile.nodeUtils.getEdgeCount(node.id);
        return node;
      });
  },

  methods: {
    getCardTitle(index) {
      return `可疑点 ${index + 1}`;
    },

    getIntervalStyle(index) {
      return index === 0 ? "" : "margin-top: 15px";
    },

    copyAddress(index) {
      const addressNode = this.$refs[`address-${index}`][0];
      if (!addressNode) {
        return;
      }

      const inputNode = this.$refs["input"][0];
      if (!inputNode) {
        return;
      }

      const text = addressNode.innerHTML;
      inputNode.value = text;
      inputNode.select();
      document.execCommand("copy");

      this.$Message.success("地址已复制");
    },

    formatDoms(leak, start = 0, limit = 10) {
      const doms = leak.doms || [];
      const lastIndex = Math.min(doms.length, start + limit);

      const list = [];
      for (let index = start; index < lastIndex; index++) {
        const rootIndex = doms[index];
        const { info: rootInfo, mark } = this.formatNode(rootIndex);
        list.push({
          id: rootIndex,
          title: rootInfo,
          expand: false,
          children: [], lastIndex: 0, more: false,
          left: 0, noChild: false,
          parents: [rootIndex],
          mark,
          showHidden: false,
          hiddenInfo: ""
        });
      }

      return { key: leak.key, list, lastIndex, more: lastIndex < doms.length, left: doms.length - lastIndex };
    },

    getInitDoms(leak) {
      const data = this.formatDoms(leak);
      this.initDoms[leak.key] = { leak, data };

      return data;
    },

    expandParent(data) {
      const { leak } = this.initDoms[data.key];
      const { list, lastIndex, more, left } = this.formatDoms(leak, data.lastIndex, 50);
      data.list = data.list.concat(list);
      data.lastIndex = lastIndex;
      data.more = more;
      data.left = left;
    },

    ...treeMethods
  }
};