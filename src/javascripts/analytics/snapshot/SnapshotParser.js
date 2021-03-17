"use strict";

import Tarjan from "@/javascripts/analytics/snapshot/Tarjan";

export default class SnapshotParser {
  constructor(profile, progress) {
    this._profile = profile;
    this._progress = progress;

    this.init();
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

  }


}