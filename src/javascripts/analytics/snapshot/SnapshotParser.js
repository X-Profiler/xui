"use strict";

import Tarjan from "@/javascripts/analytics/snapshot/Tarjan";
import NodeUtil from "@/javascripts/analytics/snapshot/NodeUtil";
import EdgeUtil from "@/javascripts/analytics/snapshot/EdgeUtil";

export default class SnapshotParser {
  constructor(profile, progress) {
    this._profile = profile;
    this._progress = progress;

    this.init();
    this.node_util = new NodeUtil(this);
    this.edge_util = new EdgeUtil(this);
    this.NodeUtil = NodeUtil;
    this.EdgeUtil = EdgeUtil;
  }

  init() {
    this._progress.updateStatus("Initializing snapshot…");

    const profile = this._profile;

    const nodes = this.nodes = profile["nodes"];
    const edges = this.edges = profile["edges"];
    const snapshot = this.snapshot = profile["snapshot"];
    this.strings = profile["strings"];
    this.root_index = snapshot["root_index"] || 0;

    const node_fields = snapshot["meta"]["node_fields"];
    const edge_fields = snapshot["meta"]["edge_fields"];
    const node_field_length = this.node_field_length = node_fields.length;
    const edge_field_length = this.edge_field_length = edge_fields.length;
    this.node_count = nodes.length / node_field_length;
    this.edge_count = edges.length / edge_field_length;
    this.node_types = snapshot["meta"]["node_types"][0];
    this.edge_types = snapshot["meta"]["edge_types"][0];
    this.node_type_offset = node_fields.indexOf("type");
    this.node_name_offset = node_fields.indexOf("name");
    this.node_address_offset = node_fields.indexOf("id");
    this.node_self_size_offset = node_fields.indexOf("self_size");
    this.node_edge_count_offset = node_fields.indexOf("edge_count");
    this.node_trace_nodeid_offset = node_fields.indexOf("trace_node_id");
    this.edge_type_offset = edge_fields.indexOf("type");
    this.edge_name_or_index_offset = edge_fields.indexOf("name_or_index");
    this.edge_to_node_offset = edge_fields.indexOf("to_node");

    this.edge_searching_map = {};
    this.page_object_flag = 4;
    this.idominator = [];
    this.dominators = {};

    this.first_edge_indexes = this.getFirstEdgeIndexes();
  }

  getFirstEdgeIndexes() {
    const nodes = this.nodes;
    const edges = this.edges;
    const root_index = this.root_index;
    const node_count = this.node_count;
    const node_field_length = this.node_field_length;
    const node_edge_count_offset = this.node_edge_count_offset;
    const edge_field_length = this.edge_field_length;
    const edge_to_node_offset = this.edge_to_node_offset;
    const edge_searching_map = this.edge_searching_map;

    const first_edge_indexes = new Array(node_count + 1);
    first_edge_indexes[node_count] = edges.length;
    for (let node_ordinal = 0, edge_index = 0; node_ordinal < node_count; node_ordinal++) {
      first_edge_indexes[node_ordinal] = edge_index;
      const offset = (nodes[node_ordinal * node_field_length + node_edge_count_offset]) * edge_field_length;
      if (node_ordinal === root_index)
        for (let i = edge_index; i < edge_index + offset; i += edge_field_length) {
          const child = edges[i + edge_to_node_offset];
          if (child % node_field_length == 0) {
            const key = ((node_ordinal) << 32) + (child / node_field_length);
            edge_searching_map[key] = i;
          }
        }
      edge_index += offset;
    }
    return first_edge_indexes;
  }

  build() {
    this.calculateFlags();
    this.buildDominatorTree();
  }

  isEssentialEdge(ordinal, type) {
    return type !== EdgeUtil.EdgeTypes.KWEAK &&
      (type !== EdgeUtil.EdgeTypes.KSHORTCUT || ordinal == this.root_index);
  }

  setBoundData(bounds, key, value) {
    if (Array.isArray(bounds[key])) {
      bounds[key].push(value);
    } else {
      bounds[key] = [value];
    }
  }

  calculateFlags() {
    this._progress.updateStatus("Calculating flags…");

    const node_count = this.node_count;
    const first_edge_indexes = this.first_edge_indexes;
    const root_index = this.root_index;
    const edge_field_length = this.edge_field_length;
    const node_util = this.node_util;
    const edge_util = this.edge_util;
    const page_object_flag = this.page_object_flag;
    const { KSYNTHETIC } = NodeUtil.NodeTypes;
    const { KELEMENT, KSHORTCUT, KWEAK } = EdgeUtil.EdgeTypes;

    const flags = this.flags = new Array(node_count);
    const node_to_visit = new Array(node_count);

    let node_to_visit_length = 0;
    for (let edge_index = first_edge_indexes[root_index],
      end_edge_index = first_edge_indexes[root_index + 1];
      edge_index < end_edge_index; edge_index += edge_field_length) {
      const target_node = edge_util.getTargetNode(edge_index, true);
      if (!node_util.checkOrdinalId(target_node))
        continue;
      const edge_type = edge_util.getTypeForInt(edge_index, true);
      if (edge_type === KELEMENT) {
        const node_type = node_util.getTypeForInt(target_node);
        const node_name = node_util.getName(target_node);
        if (!(node_type === KSYNTHETIC
          && node_name === "(Document DOM trees)"))
          continue;
      } else if (edge_type !== KSHORTCUT)
        continue;
      node_to_visit[node_to_visit_length++] = target_node;
      flags[target_node] |= page_object_flag;
    }
    // mark object from global/window/dom
    while (node_to_visit_length) {
      const ordinal = node_to_visit[--node_to_visit_length];
      const begin_edge_index = first_edge_indexes[ordinal];
      const end_edge_index = first_edge_indexes[ordinal + 1];
      for (let edge_index = begin_edge_index;
        edge_index < end_edge_index; edge_index += edge_field_length) {
        const child_ordinal = edge_util.getTargetNode(edge_index, true);
        // has been marked
        if (flags[child_ordinal] & page_object_flag)
          continue;
        const child_type = edge_util.getTypeForInt(edge_index, true);
        if (child_type === KWEAK)
          continue;
        node_to_visit[node_to_visit_length++] = child_ordinal;
        flags[child_ordinal] |= page_object_flag;
      }
    }
  }

  buildDominatorTree() {
    this._progress.updateStatus("Building dominator tree…");

    const node_count = this.node_count;
    const first_edge_indexes = this.first_edge_indexes;
    const flags = this.flags;
    const page_object_flag = this.page_object_flag;
    const edge_field_length = this.edge_field_length;
    const edge_util = this.edge_util;
    const root_index = this.root_index;

    const data = { count: node_count, root: root_index, inbounds: {}, outbounds: {} };
    for (let node_ordinal = 0; node_ordinal < node_count; ++node_ordinal) {
      const first_edge_index = first_edge_indexes[node_ordinal];
      const next_edge_index = first_edge_indexes[node_ordinal + 1];
      const node_flag = flags[node_ordinal] & page_object_flag;
      for (let edge_index = first_edge_index; edge_index < next_edge_index; edge_index += edge_field_length) {
        const edge_type = edge_util.getTypeForInt(edge_index, true);
        if (!this.isEssentialEdge(node_ordinal, edge_type))
          continue;
        const target_node = edge_util.getTargetNode(edge_index, true);
        const child_node_flag = flags[target_node] & page_object_flag;
        if (node_ordinal != root_index && child_node_flag != 0 && node_flag == 0)
          continue;
        this.setBoundData(data.inbounds, target_node, node_ordinal);
        this.setBoundData(data.outbounds, node_ordinal, target_node);
      }
    }
    const tarjan = new Tarjan(data);
    tarjan.compute();

    // get results
    this.idominator = tarjan.idominator;
    this.dominators = tarjan.dominators;
  }
}