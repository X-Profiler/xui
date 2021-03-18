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

    this._profile = null;
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

  async build() {
    await this.buildTotalRetainer();

    // dominator tree
    await this.calculateFlags();
    await this.buildPostOrderIndex();
    await this.buildDominatorTree();
  }

  isEssentialEdge(ordinal, type) {
    return type !== EdgeUtil.EdgeTypes.KWEAK &&
      (type !== EdgeUtil.EdgeTypes.KSHORTCUT || ordinal == this.root_index);
  }

  hasOnlyWeakRetainers(ordinal) {
    const first_retainer_index = this.first_retainer_index;
    const retaining_edges = this.retaining_edges;
    const edge_util = this.edge_util;
    const { KWEAK, KSHORTCUT } = EdgeUtil.EdgeTypes;

    const begin_retainer_index = first_retainer_index[ordinal];
    const end_retainer_index = first_retainer_index[ordinal + 1];
    for (let retainer_index = begin_retainer_index; retainer_index < end_retainer_index; ++retainer_index) {
      const retainer_edge_index = retaining_edges[retainer_index];
      const retainer_edge_type = edge_util.getTypeForInt(retainer_edge_index, true);
      if (retainer_edge_type !== KWEAK
        && retainer_edge_type !== KSHORTCUT)
        return false;
    }
    return true;
  }

  setBoundData(bounds, key, value) {
    if (Array.isArray(bounds[key])) {
      bounds[key].push(value);
    } else {
      bounds[key] = [value];
    }
  }

  async buildTotalRetainer() {
    const edges = this.edges;
    const node_count = this.node_count;
    const edge_count = this.edge_count;
    const node_field_length = this.node_field_length;
    const edge_field_length = this.edge_field_length;
    const edge_to_node_offset = this.edge_to_node_offset;
    const first_edge_indexes = this.first_edge_indexes;

    const retaining_nodes = this.retaining_nodes = new Array(edge_count);
    const retaining_edges = this.retaining_edges = new Array(edge_count);
    const first_retainer_index = this.first_retainer_index = new Array(node_count + 1);

    // every node's retainer count
    for (let to_node_field_index = edge_to_node_offset, l = edges.length; to_node_field_index < l; to_node_field_index += edge_field_length) {
      const to_node_index = edges[to_node_field_index];
      if (to_node_index % node_field_length != 0) {
        throw ("node index id is wrong!");
      }
      const ordinal_id = to_node_index / node_field_length;
      first_retainer_index[ordinal_id] += 1;
    }
    // set first retainer index
    for (let i = 0, first_unused_retainer_slot = 0; i < node_count; i++) {
      const retainers_count = first_retainer_index[i];
      first_retainer_index[i] = first_unused_retainer_slot;
      retaining_nodes[first_unused_retainer_slot] = retainers_count;
      first_unused_retainer_slot += retainers_count;
    }
    // for (index ~ index + 1)
    first_retainer_index[node_count] = edge_count;
    // set retaining slot
    let next_node_first_edge_index = first_edge_indexes[0];
    for (let src_node_ordinal = 0; src_node_ordinal < node_count; src_node_ordinal++) {
      const first_edge_index = next_node_first_edge_index;
      next_node_first_edge_index = first_edge_indexes[src_node_ordinal + 1];
      for (let edge_index = first_edge_index; edge_index < next_node_first_edge_index; edge_index += edge_field_length) {
        const to_node_index = edges[edge_index + edge_to_node_offset];
        if (to_node_index % node_field_length != 0) {
          throw ("to_node id is wrong!");
        }
        const first_retainer_slot_index = first_retainer_index[to_node_index / node_field_length];
        const next_unused_retainer_slot_index = first_retainer_slot_index + (--retaining_nodes[first_retainer_slot_index]);
        // save retainer & edge
        retaining_nodes[next_unused_retainer_slot_index] = src_node_ordinal;
        retaining_edges[next_unused_retainer_slot_index] = edge_index;
      }
    }
  }

  async calculateFlags() {
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

  async buildPostOrderIndex() {
    const node_count = this.node_count;
    const first_edge_indexes = this.first_edge_indexes;
    const root_index = this.root_index;
    const edge_util = this.edge_util;
    const flags = this.flags;
    const page_object_flag = this.page_object_flag;
    const edge_field_length = this.edge_field_length;

    const stack_nodes = new Array(node_count);
    const stack_current_edge = new Array(node_count);
    const post_order_index_to_ordinal = new Array(node_count);
    const ordinal_to_post_order_index = new Array(node_count);
    const visited = new Array(node_count);
    let post_order_index = 0;
    // set stack
    let stack_top = 0;
    stack_nodes[0] = root_index;
    stack_current_edge[0] = first_edge_indexes[root_index];
    visited[root_index] = 1;
    let iteration = 0;
    while (true) {
      ++iteration;
      // dfs
      while (stack_top >= 0) {
        const ordinal = stack_nodes[stack_top];
        const edge_index = stack_current_edge[stack_top];
        const end_edge_index = first_edge_indexes[ordinal + 1];
        if (edge_index < end_edge_index) {
          // stack edge current offset to next edge
          stack_current_edge[stack_top] += edge_field_length;
          const edge_type = edge_util.getTypeForInt(edge_index, true);
          if (!this.isEssentialEdge(ordinal, edge_type))
            continue;
          const target_node = edge_util.getTargetNode(edge_index, true);
          if (visited[target_node] == 1)
            continue;
          const node_flag = flags[ordinal] & page_object_flag;
          const child_node_flag = flags[target_node] & page_object_flag;
          if (ordinal != root_index && child_node_flag != 0 && node_flag == 0)
            continue;
          ++stack_top;
          stack_nodes[stack_top] = target_node;
          stack_current_edge[stack_top] = first_edge_indexes[target_node];
          visited[target_node] = 1;
        } else {
          ordinal_to_post_order_index[ordinal] = post_order_index;
          post_order_index_to_ordinal[post_order_index++] = ordinal;
          --stack_top;
        }
      }
      if (post_order_index == node_count || iteration > 1)
        break;
      // may be have some unreachable object fromm root_index, can give warnings
      --post_order_index;
      stack_top = 0;
      stack_nodes[0] = root_index;
      stack_current_edge[0] = first_edge_indexes[root_index + 1];
      for (let i = 0; i < node_count; ++i) {
        if (visited[i] == 1 || !this.hasOnlyWeakRetainers(i))
          continue;
        stack_nodes[++stack_top] = i;
        stack_current_edge[stack_top] = first_edge_indexes[i];
        visited[i] = 1;
      }
    }
    if (post_order_index != node_count) {
      --post_order_index;
      for (let i = 0; i < node_count; ++i) {
        if (visited[i] == 1)
          continue;
        ordinal_to_post_order_index[i] = post_order_index;
        post_order_index_to_ordinal[post_order_index++] = i;
      }
      ordinal_to_post_order_index[root_index] = post_order_index;
      post_order_index_to_ordinal[post_order_index++] = root_index;
    }

    return { ordinal_to_post_order_index, post_order_index_to_ordinal };
  }

  async buildDominatorTree() {
    this._progress.updateStatus("Building dominator tree…");
    await this.releaseMemory();

    const node_count = this.node_count;
    const first_edge_indexes = this.first_edge_indexes;
    const flags = this.flags;
    const page_object_flag = this.page_object_flag;
    const edge_field_length = this.edge_field_length;
    const edge_util = this.edge_util;
    const root_index = this.root_index;

    const data = { count: node_count, root: root_index, inbounds: {}, outbounds: {} };
    for (let node_ordinal = 0; node_ordinal < node_count; ++node_ordinal) {
      if (node_ordinal % 50000 === 0) {
        await this.releaseMemory(5);
      }
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
    await this.releaseMemory();
    await tarjan.compute();
    await this.clear();

    // get results
    this.idominator = tarjan.idominator;
    this.dominators = tarjan.dominators;
  }

  async clear() {
    this.nodes = null;
    this.edges = null;
    this.snapshot = null;
    this.strings = null;
    this.edge_searching_map = null;
    this.first_edge_indexes = null;
    this.flags = null;

    await this.releaseMemory();
  }

  releaseMemory(time = 100) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}